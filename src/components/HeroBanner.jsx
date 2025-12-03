 import React from 'react';
// 🔑 RUTA CORREGIDA: Sube un nivel (de 'components' a 'src') y entra en 'assets'
import heroImage from '../assets/Hogar.jpg'; 

const HeroBanner = () => {
    // Texto y contenido para el banner
    const heroTitle = "¿Proteges lo que Más Importa?";
    const heroSubtitle = "Cotiza tu seguro de propiedad hoy en menos de 5 minutos.";
    
    // Lista de beneficios
    const benefits = [
        "Cobertura total contra daños y robos.",
        "Asistencia legal 24/7.",
        "Precios adaptados a tu propiedad.",
        "Proceso 100% digital."
    ];

    return (
        <section className="hero-banner-section">
            <div className="hero-banner-content">
                <h2 className="hero-title">{heroTitle}</h2>
                <div className="hero-subtitle-container">
                    <p>{heroSubtitle}</p>
                    <span className="benefits-title">Beneficios:</span>
                    <ul className="benefits-list">
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
                
                {/* Botón que puede llevar al formulario o a otra página */}
                <a href="#cotizador" className="btn-hero-action">
                    ¡Comenzar a Cotizar!
                </a>
            </div>

            <div className="hero-image-box">
                {/* 🔑 USO DE LA VARIABLE IMPORTADA para la imagen */}
                <img 
                    className="hero-img-responsive" 
                    src={heroImage} 
                    alt="Imagen de una propiedad asegurada" 
                />
            </div>
        </section>
    );
};

export default HeroBanner;