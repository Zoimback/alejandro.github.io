import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Alejandro Rodríguez González</h1>
        <p className="hero-subtitle">
          AI Agent Developer | GitHub Copilot Specialist | MCP Developer | DevOps Engineer
        </p>
        <p className="hero-tagline">Transforming ideas into intelligent automation solutions</p>
        <div className="hero-location">
          <FaMapMarkerAlt /> Madrid, Spain
        </div>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            View Projects
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
