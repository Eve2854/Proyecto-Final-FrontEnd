 // src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      
      <div className={`container footer-content`}>
        
        <div className="footer-section"> 
          <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Contacto 📞</h3>
          
          {/* Usamos un contenedor con display grid para alinear etiquetas y datos */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr', 
            gap: '8px 12px', 
            alignItems: 'center' 
          }}>
            
            <span style={{ fontWeight: 'bold' }}>Email:</span>
            <a href="mailto:contacto@seguroshogar.com" style={{ textDecoration: 'none', color: 'inherit' }}>
              contacto@seguroshogar.com
            </a>

            <span style={{ fontWeight: 'bold' }}>Teléfono:</span>
            <span>+54 9 11 1234-5678</span>

            <span style={{ fontWeight: 'bold' }}>Dirección:</span>
            <span>Av. Principal 123, Buenos Aires, AR</span>
            
          </div>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}><a href="#privacidad">Política de Privacidad</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#terminos">Términos de Servicio</a></li>
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