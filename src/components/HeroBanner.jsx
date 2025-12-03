 // src/components/HeroBanner.jsx - CÓDIGO ACTUALIZADO CON SEPARACIÓN DE TEXTO Y LISTA
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="hero-banner-section">
      
      <div className="hero-banner-content">
        
        <h2 className="hero-title">
          La mejor protección <br /> para tu hogar
        </h2>
        
        <div className="hero-subtitle-container"> 
          Protegé tu hogar y todo lo que lo integra
          con diferentes planes y servicios adicionales que se adaptan a tus necesidades.
          
          {/* 🔑 CLAVE: Separamos la frase de la lista con un span y un margen */}
          <span className="benefits-title">Más beneficios:</span> 
          
          <ul className="benefits-list">
            <li> Servicio gratuito de urgencias domiciliarias las 24hs. </li>
            <li> Asistencia legal telefónica.</li>
            <li> Descuentos exclusivos en comercios aliados.</li>
            <li> Cobertura para bienes de valor dentro del hogar.</li>
          </ul>
        </div>
        
        <a href="#cotizador" className="btn-hero-action">
          ¡Cotizar Ahora!
        </a>
      </div>
      
      <div className="hero-image-box">
          <img 
            src= "/src/assets/Hogar.jpg"
            alt= "Hogar"
            className='hero-img-responsive' 
          />
      </div>
    </div>
  );
};

export default HeroBanner;