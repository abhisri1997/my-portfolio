import React from "react";
import { achievements, skills } from "./site-data";
import "./achievements.css";

const Achievements = () => {
  return (
    <section className="no-container my-achievement">
      <div className="my-container achievement-section">
        <div className="achievement-title" id="achievements">
          <h4 className="achievement-heading">Achievements</h4>
          <ul className="achievement-list">
            {achievements.map((achievement) => {
              const { id, text } = achievement;
              return (
                <li className="achievement" key={id}>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="skills-title">
          <h4 className="skills-heading">Skills</h4>
          <div className="my-skills">
            {skills.map((category) => {
              const { id, type, text, library } = category;
              return (
                <div key={id} className="skills-category">
                  <span className="icons">{library}</span>
                  <span className="skill-type">{type}</span>
                  <span className="skill-text">{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
