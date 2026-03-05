import React, { useEffect, useState } from "react";
import { fetchCompany, CompanyInfo } from "../services/api";
import "./intro.css";
import profile_img from "../assets/profile.webp";

const Intro = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const companyData = await fetchCompany();
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
    </header>
  );
};

export default Intro;
