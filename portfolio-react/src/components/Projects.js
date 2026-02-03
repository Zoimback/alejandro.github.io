import React from 'react';
import { FaDocker, FaWordpress } from 'react-icons/fa';
import { SiGroovy } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'AutoPiOps',
      description: 'Automatización de Operaciones y Optimización en Entornos DevOps. Herramienta diseñada para automatizar la gestión de operaciones en entornos DevOps, optimizando procesos y mejorando la eficiencia del ciclo de vida del software.',
      technologies: ['Docker', 'Groovy', 'Jenkins'],
      icon: <FaDocker />
    },
    {
      title: 'La Alarma Inteligente',
      description: 'E-commerce profesional para sistemas de seguridad AJAX Systems. Plataforma sin cuotas mensuales que ofrece control total desde el móvil, con tecnología europea premiada.',
      technologies: ['WordPress', 'E-commerce', 'SEO'],
      icon: <FaWordpress />,
      link: 'https://es.laalarmainteligente.es/'
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Ver Proyecto →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
