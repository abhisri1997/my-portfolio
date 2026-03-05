import React, { useEffect, useState } from "react";
import {
  fetchRepos,
  fetchCompany,
  Repo,
  CompanyInfo,
  ReposData,
} from "../services/api";
import { FaDirections, FaCodeBranch } from "react-icons/fa";
import "./intro.css";
import profile_img from "../assets/profile.webp";

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

const Intro = () => {
  const [reposData, setReposData] = useState<ReposData | null>(null);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [repoResult, companyData] = await Promise.all([
          fetchRepos(),
          fetchCompany(),
        ]);
        setReposData(repoResult);
        setCompany(companyData);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <header className='no-container'>
      <main className='main-header my-container'>
        <div className='card'>
          <div className='profile-img'>
            {" "}
            <img src={profile_img} alt='profile-img' className='card-img' />
          </div>
          <h1>{company?.name || "Abhinav Kumar"}</h1>
          <p className='title'>{company?.title || "Full Stack Developer"}</p>
        </div>
        <div className='about-me' id='about'>
          <h1>About Me</h1>
          {company ? (
            <>
              <p>
                Hi, I am {company.name}, Currently working as a {company.role}{" "}
                at {company.company}. I have a {company.education.degree} from{" "}
                {company.education.university}.
              </p>
              <p>
                I have an interest in Competitive Programming, Full Stack
                Development and Automation. That being said I am also self
                motivated, have made several Automation Scripts, API and NodeJS
                Projects for my Current Employer.
              </p>
            </>
          ) : (
            <>
              <p>
                Hi, I am Abhinav Kumar, Currently working as a Assistant System
                Engineer at Tata Consultancy Services Pvt LTD. I have a Bachelor
                degree in ECE(Electronics and Communication Engineering) from
                AKTU.
              </p>
              <p>
                I have an interest in Competitive Programming, Full Stack
                Development and Automation. That being said I am also self
                motivated, have made several Automation Scripts, API and NodeJS
                Projects for my Current Employer.
              </p>
            </>
          )}
        </div>
      </main>

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
    </header>
  );
};

export default Intro;
