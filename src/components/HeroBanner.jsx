 // src/components/HeroBanner.jsx
import React from 'react';
import styles from './HeroBanner.module.css';
import imagenHogar from '../assets/Hogar.jpg'; 

const HeroBanner = () => {
    return (
        <section className={styles.heroBannerSection}>
            <div className={styles.heroContentContainer}>
                <div className={styles.heroTextBox}>
                    <h1 className={styles.heroTitle}>SEGURIDAD A TU MEDIDA</h1>
                    
                    <div className="hero-subtitle-container" style={{ color: '#b0b0b0', marginBottom: '20px' }}>
                        <span className="benefits-title" style={{ color: '#dce1de' }}>
                            Protección integral para tu hogar:
                        </span>
                        <ul className="benefits-list" style={{ color: '#dce1de', marginTop: '10px' }}>
                            <li>Incendio, rayo o explosión.</li>
                            <li>Robo y hurto de bienes muebles.</li>
                            <li>Responsabilidad civil hacia terceros.</li>
                            <li>Daños por agua y cristales.</li>
                        </ul>
                    </div>

                    <a href="#cotizador-seccion" className="btn-cotizar-hero">
                        Comenzar a cotizar
                    </a>
                </div>

                <div className={styles.heroImageBox}>
                    <img 
                        src={imagenHogar} 
                        alt="Hogar Seguro" 
                        className={styles.heroResponsiveImage}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;