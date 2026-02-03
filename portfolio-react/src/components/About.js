import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">Sobre Mí</h2>
        <div className="about-card">
          <p>
            Desarrollador Python, Groovy, Bash, Docker, Jenkins, Oracle y GitLab. 
            DevOps Engineer con 2.5 años de experiencia en la automatización y optimización de procesos. 
          </p>
          <p>
            Especializado en el desarrollo de Declarative Pipelines con Groovy y Bash, además de trabajar 
            con Oracle, Docker y Python para potenciar mis soluciones.
          </p>
          <p>
            Actualmente, curso un Grado en Data Science en la Universitat Carlemany, ampliando mis conocimientos 
            en análisis y gestión de datos.
          </p>
          <p>
            Me apasiona la resolución de problemas y la creación de soluciones innovadoras que optimicen procesos 
            y generen impacto. Destaco por mi enfoque en la colaboración, la eficiencia y la calidad, contribuyendo 
            al éxito de los proyectos en los que participo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
