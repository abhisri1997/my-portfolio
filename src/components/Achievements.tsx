import React, { useEffect, useState } from "react";
import {
  fetchAchievements,
  fetchSkills,
  fetchGitHubSkills,
  Achievement,
  SkillCategory,
} from "../services/api";
import { skillIcons } from "./site-data";
import "./achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [gitHubLanguages, setGitHubLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [achievementData, skillsData] = await Promise.all([
          fetchAchievements(),
          fetchSkills(),
        ]);
        setAchievements(achievementData);
        setSkills(skillsData.skills);
      } catch (err) {
        console.error("Failed to load achievements/skills:", err);
      } finally {
        setLoading(false);
      }

      // Fetch GitHub languages separately so failures don't block achievements/skills
      try {
        const ghSkills = await fetchGitHubSkills();
        setGitHubLanguages(ghSkills.languages);
      } catch (err) {
        console.error("Failed to load GitHub languages:", err);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className='no-container my-achievement'>
        <div className='my-container achievement-section'>
          <p className='loading-text'>Loading achievements & skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section className='no-container my-achievement'>
      <div className='my-container achievement-section'>
        <div className='achievement-title' id='achievements'>
          <h4 className='achievement-heading'>Achievements</h4>
          <ul className='achievement-list'>
            {achievements.map((achievement) => {
              const { id, text } = achievement;
              return (
                <li className='achievement' key={id}>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='skills-title'>
          <h4 className='skills-heading'>Skills</h4>
          <div className='my-skills'>
            {skills.map((category) => {
              const { id, type, text } = category;
              return (
                <div key={id} className='skills-category'>
                  <span className='icons'>{skillIcons[type] || null}</span>
                  <span className='skill-type'>{type}</span>
                  <span className='skill-text'>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {gitHubLanguages.length > 0 && (
        <div className='my-container github-skills-container'>
          <h4
            className='skills-heading text-center'
            style={{ textAlign: "center" }}
          >
            GitHub Languages
          </h4>
          <div className='github-lang-list'>
            {gitHubLanguages.map((lang) => (
              <span key={lang} className='github-lang-badge'>
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
