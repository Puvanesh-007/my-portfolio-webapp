// PortfolioComponents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAsset from "../assets/useAsset";
import {
  FaExternalLinkAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFolderOpen,
  FaPhoneAlt
} from "react-icons/fa";
import { IoLogoGithub, IoEyeSharp } from "react-icons/io5";
import * as Icons from "react-icons/fa";
import "../styles/PortfolioComponents.scss";

// Certificate Component
export const Certificate = ({ 
  img, 
  title, 
  description, 
  issuedBy, 
  credentialURL, 
  isFlexShrink = false 
}) => {
  return (
    <div className={`certificate-card ${isFlexShrink ? 'flex-shrink-0 w-80' : 'w-full max-w-sm'}`}>
      <div className="certificate-image">
        <img 
          src={img} 
          alt={title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Certificate';
          }}
        />
      </div>
      
      <div className="certificate-content">
        <h3 className="certificate-title">{title}</h3>
        <p className="certificate-description">{description}</p>
        
        <div className="certificate-footer">
          <div>
            <p className="issuer-label">Issued by</p>
            <p className="issuer">{issuedBy}</p>
          </div>
          
          {credentialURL && (
            <a
              href={credentialURL}
              target="_blank"
              rel="noopener noreferrer"
              className="view-credential"
            >
              View
              <FaExternalLinkAlt className="eye-icon" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Footer Component
export const Footer = ({ activeElem, setActiveElem }) => {
  const { data: logoConfig, loading: logoLoading } = useAsset('logoConfig');
  const { data: footerIcons, loading: iconsLoading } = useAsset('footerIcons');
  const { data: navElements, loading: navLoading } = useAsset('navElements');

  const iconComponents = {
    'FaLinkedin': FaLinkedin,
    'FaGithub': FaGithub,
    'FaInstagram': FaInstagram
  };

  if (logoLoading || iconsLoading || navLoading) {
    return (
      <footer className="footer">
        <div className="footer-loading">
          <div className="loading-spinner"></div>
        </div>
      </footer>
    );
  }

  if (!logoConfig || !footerIcons || !navElements) return null;

  const { imgLogo, textLogo, showImageLogo } = logoConfig;

  return (
    <footer className="footer">
      <div className="footer-logo">
        {showImageLogo && imgLogo ? (
          <img src={imgLogo} alt="Logo" />
        ) : (
          <a
            href={`#${navElements[0]}`}
            onClick={() => setActiveElem(navElements[0])}
            className="footer-text-logo"
          >
            {textLogo}
          </a>
        )}
      </div>

      <div className="footer-social-icons">
        {footerIcons.map(({ name, component: iconName, link }) => {
          const IconComponent = iconComponents[iconName];
          return (
            <Link
              to={link}
              key={name}
              className="footer-social-link"
              title={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {IconComponent ? (
                <IconComponent className="footer-icon" />
              ) : (
                <span className="footer-icon">🔗</span>
              )}
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

// Navbar Component
export const Navbar = ({ activeElem, setActiveElem }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { data: navElements, loading: navLoading } = useAsset('navElements');
  const { data: logoConfig, loading: logoLoading } = useAsset('logoConfig');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (navLoading || logoLoading) {
    return (
      <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <nav className="navbar">
          <div className="navbar-logo loading"></div>
          <div className="navbar-menu">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="navbar-link loading"></div>
            ))}
          </div>
        </nav>
      </header>
    );
  }

  if (!navElements || !logoConfig) return null;

  const { textLogo, imgLogo, showImageLogo } = logoConfig;

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="navbar-logo">
          {showImageLogo && imgLogo ? (
            <img src={imgLogo} alt="logo" />
          ) : (
            <a
              href={`#${navElements[0]}`}
              onClick={() => setActiveElem(navElements[0])}
              className="navbar-text-logo"
            >
              {textLogo}
            </a>
          )}
        </div>

        <div className="navbar-menu">
          {navElements.map((elem) => (
            <a
              key={elem}
              href={`#${elem}`}
              className={`navbar-link ${
                activeElem === elem ? "active" : ""
              }`}
              onClick={() => setActiveElem(elem)}
            >
              {elem}
            </a>
          ))}
        </div>

        <div className="navbar-toggle" onClick={() => setShowMenu(!showMenu)}>
          <span />
          <span />
          <span />
        </div>

        <div className={`mobile-menu ${showMenu ? "visible" : ""}`}>
          {navElements.map((elem) => (
            <a
              key={elem}
              href={`#${elem}`}
              className={`mobile-menu-item ${
                activeElem === elem ? "active" : ""
              }`}
              onClick={() => {
                setActiveElem(elem);
                setShowMenu(false);
              }}
            >
              {elem}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

// PageTitle Component
export const PageTitle = ({ title }) => {
  return (
    <div className="page-title-container">
      <div className="page-title">
        {title.split("").map((char, index) => (
          <span key={index} className="letter">
            {char}
          </span>
        ))}
      </div>
      <hr className="page-title-divider" />
    </div>
  );
};

// Project Component
export const Project = ({
  projectName = "Untitled Project",
  projectDescription = "No description provided.",
  projectURL = "",
  githubRepository = "",
  tags = [],
  date = "",
}) => {
  return (
    <div className="project-card">
      <FaFolderOpen className="project-folder-icon" />
      <div className="project-title">{projectName}</div>
      <div className="project-description">{projectDescription}</div>

      <div className="project-tags">
        {Array.isArray(tags) && tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="project-footer">
        <div className="project-date">{date}</div>
        <div className="project-actions">
          {projectURL && (
            <a
              href={projectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link"
              title="Live Demo"
            >
              <IoEyeSharp className="project-icon demo-icon" />
            </a>
          )}
          {githubRepository && (
            <a
              href={githubRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link"
              title="Source Code"
            >
              <IoLogoGithub className="project-icon github-icon" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};