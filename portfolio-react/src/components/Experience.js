import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      company: 'Accenture España',
      role: 'GenIA - DevOps Senior Engineer',
      period: 'Mayo 2025 - Presente',
      description: [
        'Desarrollo de agentes de IA con GitHub Copilot',
        'Servidores MCP en Python con Docker',
        'Automatización con IA Generativa',
        'CI/CD con GitHub Actions',
        'Integración de sistemas con WebHooks'
      ]
    },
    {
      company: 'Linea Directa Aseguradora',
      role: 'DevOps Engineer',
      period: 'Febrero 2024 - Mayo 2025',
      description: [
        'Creación y optimización de Pipelines en Jenkins usando Groovy',
        'Administración de repositorios en GitLab',
        'Administración y mantenimiento de Dimensions',
        'Monitorización y gestión de sistemas'
      ]
    },
    {
      company: 'Indra',
      role: 'DevOps Engineer',
      period: 'Enero 2023 - Febrero 2024',
      description: [
        'Desarrollo de software',
        'Mantenimiento del SO',
        'Control de versiones',
        'Integración y automatización de software'
      ]
    }
  ];

  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Experiencia</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
                <p className="period">{exp.period}</p>
                <ul>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
