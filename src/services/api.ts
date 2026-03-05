import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export interface Repo {
  id: number;
  repoName: string;
  repoLink: string;
  repoDesc: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  fork: boolean;
}

export interface ReposData {
  projects: Repo[];
  contributions: Repo[];
}

export interface CompanyInfo {
  name: string;
  title: string;
  company: string;
  role: string;
  description: string;
  education: {
    degree: string;
    university: string;
  };
}

export interface Achievement {
  id: number;
  text: string;
}

export interface SkillCategory {
  id: number;
  type: string;
  text: string;
}

export interface SkillsData {
  skills: SkillCategory[];
  interests: string[];
  raw: {
    languages: string[];
    frameworks: string[];
    automation: string[];
    databases: string[];
  };
}

export interface GitHubSkills {
  languages: string[];
  count: number;
}

export const fetchRepos = async (): Promise<ReposData> => {
  const response = await api.get("/api/github/repos");
  return response.data;
};

export const fetchGitHubSkills = async (): Promise<GitHubSkills> => {
  const response = await api.get("/api/github/skills");
  return response.data.data;
};

export const fetchCompany = async (): Promise<CompanyInfo> => {
  const response = await api.get("/api/profile/company");
  return response.data.data;
};

export const fetchAchievements = async (): Promise<Achievement[]> => {
  const response = await api.get("/api/profile/achievements");
  return response.data.data;
};

export const fetchSkills = async (): Promise<SkillsData> => {
  const response = await api.get("/api/profile/skills");
  return response.data.data;
};
