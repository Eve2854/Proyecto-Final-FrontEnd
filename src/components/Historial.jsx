 import React, { useState, useEffect } from 'react';

const Historial = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  const cargarHistorial = () => {
    const datos = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    setCotizaciones(datos);
  };

  useEffect(() => {
    cargarHistorial();
    // 🔑 Escucha el evento "storage" para actualizarse cuando el formulario guarda algo
    window.addEventListener("storage", cargarHistorial);
    return () => window.removeEventListener("storage", cargarHistorial);
  }, []);

  const eliminarHistorial = () => {
    if (window.confirm("¿Deseas borrar todo el historial?")) {
      localStorage.removeItem("historialCotizaciones");
      setCotizaciones([]);
    }
  };

  if (cotizaciones.length === 0) {
    return (
      <div className="container" style={{marginTop: '20px', padding: '40px', textAlign: 'center'}}>
        <h2>Historial Vacío</h2>
        <p>Aún no has guardado ninguna cotización.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{marginTop: '20px', padding: '40px'}}>
      <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Tu Historial de Cotizaciones</h2>
      
      {cotizaciones.map((c) => (
        <div key={c.id} className="resumen" style={{marginBottom: '15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <p style={{fontSize: '0.85rem', color: '#666'}}>{c.fecha}</p>
              <p><strong>Propiedad:</strong> {c.vivienda} en {c.ubicacion}</p>
              <p><strong>Cobertura:</strong> {c.plan}</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={{fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--accent)'}}>${c.precio}</p>
            </div>
          </div>
        </div>
      ))}

      <button className="btn-hero-action" onClick={eliminarHistorial} style={{background: '#c0392b', marginTop: '20px'}}>
        Vaciar Historial
      </button>
    </div>
  );
};

export default Historial;