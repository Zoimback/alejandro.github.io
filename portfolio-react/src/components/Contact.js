import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu mensaje! Te responderé pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <div className="contact-content">
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Tu mensaje"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
            </form>
          </div>
          <div className="contact-info">
            <h3>Conecta Conmigo</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/alejandro-rodr%C3%ADguez-gonz%C3%A1lez/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/alejandro-rodriguez" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub /> GitHub
              </a>
              <a href="mailto:contacto@alejandrorodriguez.tech" className="social-link">
                <FaEnvelope /> Email
              </a>
            </div>
          </div>
        </div>
        <footer className="footer">
          <p>&copy; 2026 Alejandro Rodríguez González. Todos los derechos reservados.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
