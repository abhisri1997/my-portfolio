import { useEffect, useState } from "react";
import nav_menu, { social_icons } from "./site-data";
import { AiOutlineMenu } from "react-icons/ai";
import "./navbar.css";

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickyNavbar.bind(null, 1));

    return () => {
      window.removeEventListener("scroll", stickyNavbar.bind(null, 1));
    };
  }, []);

  const stickyNavbar = (id: number) => {
    if (window !== undefined && id === 1) {
      let windowHeight = window.scrollY;
      windowHeight > 150 ? setStickyClass("sticky") : setStickyClass("");
    } else {
      if (window.innerWidth >= 900) {
        setIsToggled(false);
      }
    }
  };

  return (
    <div className={`no-container ${stickyClass}`}>
      <nav className="my-container navbar">
        <div className="navbar-logo">
          <div className="logo">
            <a href={window.location.origin} className="logo-link">
              AK
            </a>
          </div>
          <AiOutlineMenu
            className="toggle-bar icons"
            onClick={() => setIsToggled(!isToggled)}
          />
        </div>
        <div className="navbar-links">
          <ul className={isToggled ? "nav-menu dropdown" : "nav-menu"}>
            {nav_menu.map((item) => {
              const { id, text, url } = item;
              return (
                <li key={id} className="nav-link">
                  <a href={url} onClick={() => setIsToggled(false)}>
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className="social-icons">
            {social_icons.map((platform) => {
              const { id, type, library, url } = platform;
              return (
                <li key={id} className={`${type}`}>
                  <a href={url} rel="noreferrer noopener" target="_blank">
                    {library}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
