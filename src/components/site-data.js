import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaDatabase,
  FaLinkedinIn,
} from "react-icons/fa";
import { VscTerminalPowershell } from "react-icons/vsc";
import { SiCodecademy, SiRobotframework } from "react-icons/si";
import axios from "axios";

const nav_menu = [
  { id: 1, text: "Home", url: window.location.origin },
  { id: 2, text: "Projects", url: "#projects" },
  { id: 3, text: "Achievements/Skills", url: "#achievements" },
  { id: 4, text: "About", url: "#about" },
];

export const fetchRepo = async () => {
  const url = "https://recent-repo.p.rapidapi.com/repos";
  const repos = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_APIHost,
      "X-RapidAPI-Key": process.env.REACT_APP_APIKey,
    },
    params: {
      user: "abhisri1997",
      repo: 6,
    },
  });
  return repos;
};

export const social_icons = [
  {
    id: 1,
    type: "Facebook",
    library: <FaFacebookF className="icon" />,
    url: "https://facebook.com/abhishree143",
  },
  {
    id: 2,
    type: "Twitter",
    library: <FaTwitter className="icon" />,
    url: "https://twitter.com/abhisri1997",
  },
  {
    id: 3,
    type: "GitHub",
    library: <FaGithub className="icon" />,
    url: "https://github.com/dev-elixir",
  },
  {
    id: 4,
    type: "LinkedIN",
    library: <FaLinkedinIn className="icon" />,
    url: "https://www.linkedin.com/in/abhisri1997/",
  },
];

export const achievements = [
  {
    id: 1,
    text: "A certain task would have taken a total of 7-10 days of work but with the help of scripting I had automated all the task from extraction of data to validation in within 3 days.",
  },
  {
    id: 2,
    text: "Created an API with the help of Node JS, Express, Cheerio and Puppeteer and implemented it with Microsoft Flow to generate an alert in our Teams group.",
  },
  {
    id: 3,
    text: "Also created several automation scripts to help my team deliver the tasks on time.",
  },
];

export const skills = [
  {
    id: 1,
    type: "Languages",
    library: <SiCodecademy />,
    text: "JavaScript, HTML5, CSS3, ReactJS, NodeJS, ExpressJS",
  },
  {
    id: 2,
    type: "Automation",
    library: <VscTerminalPowershell />,
    text: "Shell Scripting",
  },
  {
    id: 3,
    type: "FrameWorks",
    library: <SiRobotframework />,
    text: "ReactJS, NodeJS, ExpressJS, jQuery, KnockOutJS",
  },
  {
    id: 4,
    type: "Database",
    library: <FaDatabase />,
    text: "PostgreSql, MySQL",
  },
];

export default nav_menu;
