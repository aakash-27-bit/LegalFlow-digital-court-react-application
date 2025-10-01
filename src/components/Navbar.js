import React, { useEffect, useState } from "react";
import './Navbar.css';
import logo from '../assets/revamp/navbar_logo.png';
import { useNavigate } from "react-router";
// import { FiGlobe } from 'react-icons/fi';
// import { MdKeyboardArrowDown } from 'react-icons/md';
const sections = [
  { id: "hero-section-wrapper", label: "Get Started" },
  { id: "journey-section-wrapper", label: "Why HighWheels" },
  { id: "inventory-section-wrapper", label: "Outcomes" },
  // { id: "stats-section-wrapper", label: "Stats" },
  { id: "steps-section-wrapper", label: "Steps" },
  { id: "features-section-wrapper", label: "Features" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const router = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      let found = sections[0].id;
      for (const section of sections) {
        const el = document.querySelector(`.${section.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = section.id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.querySelector(`.${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="navbar_logo" className="navbar-logo-img" />
          </div>

        </div>
        <div className="navbar-right gap-16">
          <ul className="navbar-primary-menu">
            {sections.map((section) => (
              <li
                key={section.id}
                className={`navbar-menu-item${activeSection === section.id ? " active" : ""}`}
                onClick={() => handleClick(section.id)}
              >
                {section.label}
              </li>
            ))}
          </ul>
          <ul className="navbar-secondary-menu">
            <li className="navbar-menu-item btn" onClick={() => router("/login")}>
              Login
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
