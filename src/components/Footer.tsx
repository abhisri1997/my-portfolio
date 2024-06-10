import React, { useEffect, useState } from "react";
import { FaCopyright } from "react-icons/fa";
import { social_icons } from "./site-data";
import "./footer.css";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear().toString();
    setYear(currentYear);
  }, []);

  return (
    <footer className="no-container">
      <div className="main-footer">
        <ul className="social-icons">
          {social_icons.map((platform) => {
            const { id, type, library, url } = platform;
            return (
              <li key={id} className={`icon ${type}`}>
                <a href={url} rel="noreferrer noopener" target="_blank">
                  {library}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="footer-text">
          <span>
            <FaCopyright className="copyright-icon" />
            &nbsp;&nbsp;{year}&nbsp;Abhinav Kumar. All Rights Reserved
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
