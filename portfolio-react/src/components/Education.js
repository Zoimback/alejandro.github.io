import React from 'react';
import './Education.css';

const Education = () => {
  const education = [
    {
      institution: 'Universitat Carlemany',
      degree: 'Grado en Data Science',
      field: 'Computer Science',
      period: 'Octubre 2024 - Junio 2027'
    },
    {
      institution: 'CES, Escuela Superior de Imagen y Sonido',
      degree: 'Desarrollo de aplicaciones multiplataforma',
      field: 'Ciberseguridad y BigData, Computer Programming',
      period: 'Septiembre 2020 - Junio 2022'
    }
  ];

  return (
    <section className="education" id="education">
      <div className="container">
        <h2 className="section-title">Educación</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div className="education-card" key={index}>
              <h3>{edu.institution}</h3>
              <h4>{edu.degree}</h4>
              <p className="field">{edu.field}</p>
              <p className="period">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
