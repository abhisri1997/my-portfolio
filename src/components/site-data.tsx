import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaDatabase,
  FaLinkedinIn,
} from "react-icons/fa";
import { VscTerminalPowershell } from "react-icons/vsc";
import { SiCodecademy, SiRobotframework } from "react-icons/si";

interface NavItem {
  id: number;
  text: string;
  url: string;
}

interface SocialIcon {
  id: number;
  type: string;
  library: React.ReactNode;
  url: string;
}

const nav_menu: NavItem[] = [
  { id: 1, text: "Home", url: window.location.origin },
  { id: 2, text: "Projects", url: "#projects" },
  { id: 3, text: "Achievements/Skills", url: "#achievements" },
  { id: 4, text: "About", url: "#about" },
];

export const social_icons: SocialIcon[] = [
  {
    id: 1,
    type: "Facebook",
    library: <FaFacebookF className='icon' />,
    url: "https://facebook.com/abhishree143",
  },
  {
    id: 2,
    type: "Twitter",
    library: <FaTwitter className='icon' />,
    url: "https://twitter.com/abhisri1997",
  },
  {
    id: 3,
    type: "GitHub",
    library: <FaGithub className='icon' />,
    url: "https://github.com/abhisri1997",
  },
  {
    id: 4,
    type: "LinkedIN",
    library: <FaLinkedinIn className='icon' />,
    url: "https://www.linkedin.com/in/abhisri1997/",
  },
];

// Icon mappings for skill categories (used by Achievements component)
export const skillIcons: Record<string, React.ReactNode> = {
  Languages: <SiCodecademy />,
  Automation: <VscTerminalPowershell />,
  Frameworks: <SiRobotframework />,
  Databases: <FaDatabase />,
};

export default nav_menu;
