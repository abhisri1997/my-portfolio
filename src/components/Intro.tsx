import React, { useEffect, useState } from "react";
import { fetchRepo } from "./site-data";
import { FaDirections } from "react-icons/fa";
import "./intro.css";
import profile_img from "../assets/profile.webp";

const Intro = () => {
  const [gitHub, setGitHub] = useState([]);

  const getGitHub = async () => {
    const data = await fetchRepo();
    setGitHub(data.data);
  };

  useEffect(() => {
    getGitHub();
  }, []);

  return (
    <header className="no-container">
      <main className="main-header my-container">
        <div className="card">
          <div className="profile-img">
            {" "}
            <img src={profile_img} alt="profile-img" className="card-img" />
          </div>
          <h1>Abhinav Kumar</h1>
          <p className="title">Full Stack Developer</p>
        </div>
        <div className="about-me" id="about">
          <h1>About Me</h1>
          <p>
            Hi, I am Abhinav Kumar, Currently working as a Assistant System
            Engineer at Tata Consultancy Services Pvt LTD. I have a Bachelor
            degree in ECE(Electronics and Communication Engineering) from AKTU.
          </p>
          <p>
            I have a an interest in Competitive Programming, Full Stack
            Development and Automation. That being said am also self motivated,
            have made several Automation Scripts, API and NodeJS Projects for my
            Current Employer.
          </p>
          <p className="project-showcase" id="projects">
            Recent Projects{" "}
          </p>
          <ul className="my-projects">
            {gitHub.length > 0 &&
              gitHub.map((repo) => {
                // console.log(repo);
                const { id, repoName, repoLink, repoDesc } = repo;
                return (
                  <li className="project" key={id}>
                    <h4 className="project-name">
                      <a
                        className="project-link"
                        href={repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="icons">
                          <FaDirections />
                        </span>
                        {repoName}
                      </a>
                    </h4>
                    <p className="project-desc">{repoDesc}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </main>
    </header>
  );
};

export default Intro;
