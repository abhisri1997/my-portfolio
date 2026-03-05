import { useCallback, useEffect, useState } from "react";
import nav_menu, { social_icons } from "./site-data";
import { AiOutlineMenu } from "react-icons/ai";
import "./navbar.css";

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      setStickyClass(windowHeight > 150 ? "sticky" : "");
    }
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 900) {
      setIsToggled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <div className={`no-container ${stickyClass}`}>
      <nav className='my-container navbar'>
        <div className='navbar-logo'>
          <div className='logo'>
            <a href={window.location.origin} className='logo-link'>
              AK
            </a>
          </div>
          <AiOutlineMenu
            className='toggle-bar icons'
            onClick={() => setIsToggled(!isToggled)}
          />
        </div>
        <div className='navbar-links'>
          <ul className={isToggled ? "nav-menu dropdown" : "nav-menu"}>
            {nav_menu.map((item) => {
              const { id, text, url } = item;
              return (
                <li key={id} className='nav-link'>
                  <a href={url} onClick={() => setIsToggled(false)}>
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className='social-icons'>
            {social_icons.map((platform) => {
              const { id, type, library, url } = platform;
              return (
                <li key={id} className={`${type}`}>
                  <a href={url} rel='noreferrer noopener' target='_blank'>
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
