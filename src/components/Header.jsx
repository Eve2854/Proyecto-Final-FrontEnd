 // src/components/Header.jsx - CÓDIGO FINAL CLÁSICO
import React from 'react';
// 🚫 ELIMINA: import styles from './Header.module.css';

const Header = () => {
  return (
    // Usamos las clases clásicas que ahora están en index.css
    <header className="main-header">
      
      <h1 className="header-combined-title">
        SEGUROS HOGAR
      </h1> 
      <br/>
      <span>Simulador de Cotización</span>
      
    </header>
  );
};

export default Header;