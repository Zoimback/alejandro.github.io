import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = [
    'Python', 'Git', 'Docker', 'Groovy', 'Jenkins', 'Bash',
    'GitHub Copilot', 'MCP', 'Oracle', 'GitLab', 'CI/CD', 'GitHub Actions',
    'React', 'JavaScript', 'MongoDB', 'Red Hat Linux', 'ClearCase'
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-badge" key={index}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
