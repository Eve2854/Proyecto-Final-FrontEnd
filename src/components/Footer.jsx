 // src/components/Footer.jsx - CÓDIGO FINAL CLÁSICO
import React from 'react';
// 🚫 IMPORTACIÓN ELIMINADA: import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Usamos la clase clásica
    <footer className="main-footer">
      
      {/* Usamos las clases clásicas: "container" es global, "footer-content" es nueva */}
      <div className={`container footer-content`}>
        
        <div className="footer-section"> 
          <h3>Contacto 📞</h3>
          <p>Email: <a href="mailto:contacto@seguroshogar.com">contacto@seguroshogar.com</a></p>
          <p>Teléfono: +54 9 11 1234-5678</p>
          <p>Dirección: Av. Principal 123, Buenos Aires, AR</p>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#privacidad">Política de Privacidad</a></li>
            <li><a href="#terminos">Términos de Servicio</a></li>
            <li><a href="#avisos">Avisos Legales</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Seguros Hogar. Todos los derechos reservados. | Desarrollado por Evelyn Sepúlveda.
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;