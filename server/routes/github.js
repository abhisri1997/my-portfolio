const express = require("express");
const axios = require("axios");

const router = express.Router();

const GITHUB_API = "https://api.github.com";
const USERNAME = process.env.GITHUB_USERNAME || "abhisri1997";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

// Build headers — includes auth token if configured (raises limit from 60 to 5,000/hr)
function getHeaders() {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-api",
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

// Simple in-memory cache to avoid GitHub API rate limiting
const cache = {
  repos: { data: null, timestamp: 0 },
  skills: { data: null, timestamp: 0 },
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function isCacheValid(key) {
  return cache[key].data && Date.now() - cache[key].timestamp < CACHE_TTL;
}

/**
 * GET /api/github/repos
 * Fetches repos and splits into projects (non-forks) and contributions (forks).
 */
router.get("/repos", async (_req, res) => {
  try {
    if (isCacheValid("repos")) {
      return res.json(cache.repos.data);
    }

    const response = await axios.get(`${GITHUB_API}/users/${USERNAME}/repos`, {
      params: {
        sort: "updated",
        direction: "desc",
        per_page: 30,
      },
      headers: getHeaders(),
    });

    const mapRepo = (repo) => ({
      id: repo.id,
      repoName: repo.name,
      repoLink: repo.html_url,
      repoDesc: repo.description || "No description available",
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      fork: repo.fork,
    });

    const allRepos = response.data.map(mapRepo);

    const projects = allRepos.filter((r) => !r.fork).slice(0, 6);

    // For forks, check if the user actually has commits (not just bare forks)
    const forkedRepos = allRepos.filter((r) => r.fork);
    const contributionChecks = await Promise.allSettled(
      forkedRepos.map(async (repo) => {
        const commitsRes = await axios.get(
          `${GITHUB_API}/repos/${USERNAME}/${repo.repoName}/commits`,
          {
            params: { author: USERNAME, per_page: 1 },
            headers: getHeaders(),
          },
        );
        return commitsRes.data.length > 0 ? repo : null;
      }),
    );

    const contributions = contributionChecks
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => r.value)
      .slice(0, 6);

    const result = { projects, contributions };

    cache.repos = { data: result, timestamp: Date.now() };
    res.json(result);
  } catch (error) {
    console.error("GitHub repos error:", error.message);

    // Return cached data if available, even if expired
    if (cache.repos.data) {
      return res.json({ ...cache.repos.data, cached: true });
    }

    res.status(500).json({
      error: "Failed to fetch GitHub repositories",
      message: error.message,
    });
  }
});

/**
 * GET /api/github/skills
 * Aggregates languages from owned repos + forks with actual contributions only.
 */
router.get("/skills", async (_req, res) => {
  try {
    if (isCacheValid("skills")) {
      return res.json({ data: cache.skills.data });
    }

    const response = await axios.get(`${GITHUB_API}/users/${USERNAME}/repos`, {
      params: { per_page: 100 },
      headers: getHeaders(),
    });

    const allRepos = response.data;
    const ownedRepos = allRepos.filter((r) => !r.fork);
    const forkedRepos = allRepos.filter((r) => r.fork);

    // Collect languages from owned repos
    const languageSet = new Set();
    ownedRepos.forEach((repo) => {
      if (repo.language) languageSet.add(repo.language);
    });

    // For forks, only include languages if user has actual commits
    const forkChecks = await Promise.allSettled(
      forkedRepos.map(async (repo) => {
        const commitsRes = await axios.get(
          `${GITHUB_API}/repos/${USERNAME}/${repo.name}/commits`,
          {
            params: { author: USERNAME, per_page: 1 },
            headers: getHeaders(),
          },
        );
        return commitsRes.data.length > 0 ? repo : null;
      }),
    );

    const contributedForks = forkChecks
      .filter((r) => r.status === "fulfilled" && r.value !== null)
      .map((r) => r.value);

    contributedForks.forEach((repo) => {
      if (repo.language) languageSet.add(repo.language);
    });

    // Get detailed language breakdown for owned + contributed repos
    const relevantRepos = [...ownedRepos, ...contributedForks].slice(0, 15);
    const languagePromises = relevantRepos.map((repo) =>
      axios
        .get(`${GITHUB_API}/repos/${USERNAME}/${repo.name}/languages`, {
          headers: getHeaders(),
        })
        .catch(() => ({ data: {} })),
    );

    const languageResults = await Promise.all(languagePromises);
    languageResults.forEach((result) => {
      Object.keys(result.data).forEach((lang) => languageSet.add(lang));
    });

    const skillsData = {
      languages: Array.from(languageSet).sort(),
      count: languageSet.size,
    };

    cache.skills = { data: skillsData, timestamp: Date.now() };
    res.json({ data: skillsData });
  } catch (error) {
    console.error("GitHub skills error:", error.message);

    // Return cached data if available, even if expired
    if (cache.skills.data) {
      return res.json({ data: cache.skills.data, cached: true });
    }

    res.status(500).json({
      error: "Failed to fetch GitHub skills",
      message: error.message,
    });
  }
});

module.exports = router;
