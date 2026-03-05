import React, { useEffect, useState } from "react";
import { fetchRepos, Repo, ReposData } from "../services/api";
import { FaDirections, FaCodeBranch } from "react-icons/fa";
import "./projects.css";

const RepoList = ({
  repos,
  icon,
}: {
  repos: Repo[];
  icon: "project" | "contribution";
}) => (
  <ul className='my-projects'>
    {repos.map((repo) => {
      const { id, repoName, repoLink, repoDesc } = repo;
      return (
        <li className='repo-card' key={id}>
          <div className='repo-card-header'>
            <span className='repo-card-icon'>
              {icon === "contribution" ? <FaCodeBranch /> : <FaDirections />}
            </span>
            <a
              className='repo-card-title'
              href={repoLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {repoName}
            </a>
          </div>
          <div className='repo-card-body'>
            <p className='repo-card-desc'>{repoDesc}</p>
          </div>
          {repo.language && (
            <div className='repo-card-footer'>
              <span className='repo-card-lang'>{repo.language}</span>
            </div>
          )}
        </li>
      );
    })}
  </ul>
);

const Projects = () => {
  const [reposData, setReposData] = useState<ReposData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const repoResult = await fetchRepos();
        setReposData(repoResult);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className='my-container projects-section'>
      {loading && <p className='loading-text'>Loading projects...</p>}
      {error && <p className='error-text'>{error}</p>}

      {reposData && (
        <div className='repos-grid' id='projects'>
          <div className='repos-column'>
            <h2 className='project-showcase'>My Projects</h2>
            {reposData.projects.length > 0 ? (
              <RepoList repos={reposData.projects} icon='project' />
            ) : (
              <p className='loading-text'>No projects found.</p>
            )}
          </div>
          <div className='repos-column'>
            <h2 className='project-showcase' id='contributions'>
              Open Source Contributions
            </h2>
            {reposData.contributions.length > 0 ? (
              <RepoList repos={reposData.contributions} icon='contribution' />
            ) : (
              <p className='loading-text'>No contributions found.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
