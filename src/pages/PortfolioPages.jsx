// PortfolioPages.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import useAsset from "../assets/useAsset.js";
import { PageTitle, Project, Certificate } from "../components/components.js";
import {
  LuGraduationCap,
} from "react-icons/lu";
import { FaPhoneAlt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { TbBrandKotlin } from 'react-icons/tb';
import { BsFiletypeXml } from 'react-icons/bs';
import { SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si';
import { MdEmail } from "react-icons/md";
import * as Icons from "react-icons/fa";
import "../styles/PortfolioPages.scss";

const iconMap = {
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  TbBrandKotlin,
  BsFiletypeXml,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
};

// About Component
export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: aboutData, loading, error } = useAsset('aboutPage');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="about-section" id="About">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-section" id="About">
        <div className="error-message">Error loading about data: {error}</div>
      </div>
    );
  }

  if (!aboutData) return null;

  return (
    <div
      className={`about-section ${isVisible ? 'visible' : ''}`}
      id="About"
    >
      <div className={`about-content ${isVisible ? 'visible' : ''}`}>
        <div className="about-greeting">
          Hi, I am <strong className="author-name">{aboutData.authorName}</strong>
        </div>
        <div className="about-description">
          {aboutData.authorDescription}
        </div>
      </div>
    </div>
  );
};

// Education Component
export const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: educationData, loading, error } = useAsset('educationPage');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="Education" className="education-section">
        <PageTitle title={"Education"} />
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="Education" className="education-section">
        <PageTitle title={"Education"} />
        <div className="error-state">
          Error loading education data: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {educationData?.length > 0 && (
        <div id="Education" className="education-section">
          <PageTitle title={"Education"} />
          <div className="education-grid">
            {educationData.map(
              ({ degreeType, graduationYear, institution, institutionUrl }, index) => (
                <div
                  key={index}
                  className={`education-card ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="education-info">
                    <div className="graduation-year">{graduationYear}</div>
                    <div className="degree-type">{degreeType}</div>
                  </div>
                  <div className="institution-info">
                    <LuGraduationCap className="graduation-icon" />
                    <Link
                      to={institutionUrl}
                      className="institution-link"
                    >
                      {institution}
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Skills Component
export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: skillsData, loading, error } = useAsset('skillsPage');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="Skills" className="skills-section">
        <PageTitle title={"Skills"} />
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="Skills" className="skills-section">
        <PageTitle title={"Skills"} />
        <div className="error-state">
          Error loading skills: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {skillsData?.length > 0 && (
        <div id="Skills" className="skills-section">
          <PageTitle title={"Skills"} />
          <div className="skills-grid">
            {skillsData.map((skill, index) => {
              const Icon = iconMap[skill.component];
              return (
                <div
                  key={index}
                  className={`skill-item ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="skill-card">
                    {Icon ? <Icon className="skill-icon" /> : <span className="skill-text">{skill.name}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

// Projects Component
export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: projectsData, loading, error } = useAsset('projectsPage');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="Projects" className="projects-section">
        <PageTitle title={"Projects"} />
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="Projects" className="projects-section">
        <PageTitle title={"Projects"} />
        <div className="error-state">
          Error loading projects: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {projectsData?.length > 0 && (
        <div id="Projects" className="projects-section">
          <PageTitle title={"Projects"} />
          <div className="projects-grid">
            {projectsData.map(
              (
                {
                  projectName,
                  projectDescription,
                  projectURL,
                  githubRepository,
                  tags,
                  date,
                },
                index
              ) => (
                <div
                  key={index}
                  className={`project-item ${isVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Project
                    projectName={projectName}
                    projectDescription={projectDescription}
                    projectURL={projectURL}
                    githubRepository={githubRepository}
                    tags={tags}
                    date={date}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Certificates Component

export const Certificates = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Fetch data using the custom hook
  const { data: certificatesData, loading, error } = useAsset('certificatesPage');
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure certificates is always an array
  const certificates = Array.isArray(certificatesData)
    ? certificatesData
    : certificatesData?.data || [];

  // Define card dimensions and visible cards.
  // Make sure these match your actual CSS dimensions for accurate sliding.
  const cardWidth = 280; // Match your card's actual CSS width in Certificate.css if applied via min-width
  const gap = 24; // Match your card's actual CSS margin-right
  const visibleCards = 4; // Number of cards intended to be visible at once

  // Calculate total number of "slides" or groups of cards
  // Only create slides if there are more certificates than can fit in one view
  const totalSlides = certificates.length > visibleCards ? Math.ceil((certificates.length - visibleCards) / 1) + 1 : 1;


  useEffect(() => {
    // Timeout for fade-in effect
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <div id="Certificates" className="certificates-section">
        <PageTitle title="Certificates" />
        <div className="loading-container">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="Certificates" className="certificates-section">
        <PageTitle title="Certificates" />
        <div className="error-container">
          <div className="error-message">Error: {error.message || String(error)}</div>
        </div>
      </div>
    );
  }

  return (
    <div id="Certificates" className={`certificates-section ${isVisible ? 'visible' : ''}`}>
      <PageTitle title="Certificates" />
      {certificates.length > 0 ? (
        <div className="certificates-slider-container">
          <div
            className="certificates-slider"
            ref={sliderRef}
            style={{
              // Calculate the total pixel distance to transform
              // (cardWidth + gap) is the width of one card including its right margin
              transform: `translateX(-${(cardWidth + gap) * currentIndex}px)`
            }}
          >
            {certificates.map((cert, index) => (
              <div
                key={index} // Consider using cert.id if available and unique
                style={{
                  minWidth: `${cardWidth}px`, // Explicitly set minWidth for card
                  flexShrink: 0, // Prevent cards from shrinking
                  marginRight: `${gap}px` // Apply the gap between cards
                }}
              >
                <Certificate {...cert} />
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button
              className="slider-button left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <button
              className="slider-button right"
              onClick={handleNext}
              disabled={currentIndex >= totalSlides - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <div className="no-certificates">
          <div className="no-certificates-text">No certificates found</div>
        </div>
      )}
    </div>
  );
};

// Contact Component
export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: aboutData, loading: aboutLoading, error: aboutError } = useAsset('aboutPage');
  const { data: footerIconsData, loading: iconsLoading, error: iconsError } = useAsset('footerIcons');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (aboutLoading || iconsLoading) {
    return (
      <div id="Contact" className="contact-section">
        <PageTitle title={"Contact"} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (aboutError || iconsError) {
    return (
      <div id="Contact" className="contact-section">
        <PageTitle title={"Contact"} />
        <div className="error-container">
          <div className="error-message">Error loading contact data</div>
        </div>
      </div>
    );
  }

  if (!aboutData || !footerIconsData) return null;

  return (
    <div id="Contact" className="contact-section">
      <PageTitle title={"Contact"} />
      
      <div className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <div className="contact-card">
          <h1 className="contact-title">Contact Me</h1>
          <p className="contact-description">
            Feel free to reach out for collaboration, project inquiries, or just to connect!
          </p>

          <div className="contact-links">
            <Link
              to={`mailto:${aboutData.authorContactMail}`}
              className="contact-link animate-fade-in-up"
            >
              <MdEmail className="contact-icon" />
              <span>{aboutData.authorContactMail}</span>
            </Link>

            <Link
              to={`tel:${aboutData.authorContactNumber}`}
              className="contact-link animate-fade-in-up"
            >
              <FaPhoneAlt className="contact-icon" />
              <span>{aboutData.authorContactNumber}</span>
            </Link>
          </div>

          <div className="social-icons">
            {footerIconsData.map(({ name, component, link }, index) => {
              const IconComponent = Icons[component];
              return IconComponent ? (
                <Link
                  to={link}
                  key={index}
                  title={name}
                  className="social-link"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <IconComponent className="social-icon" />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};