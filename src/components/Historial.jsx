 import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

const Historial = ({ volver }) => {
  const [cotizaciones, setCotizaciones] = useState([]);

  const cargarHistorial = () => {
    const datos = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    setCotizaciones(datos);
  };

  useEffect(() => {
    cargarHistorial();
    window.addEventListener("storage", cargarHistorial);
    return () => window.removeEventListener("storage", cargarHistorial);
  }, []);

  const eliminarCotizacion = (id) => {
    Swal.fire({
      title: '¿Eliminar cotización?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2c3e50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoHistorial = cotizaciones.filter(c => c.id !== id);
        setCotizaciones(nuevoHistorial);
        localStorage.setItem("historialCotizaciones", JSON.stringify(nuevoHistorial));
        Swal.fire({ title: '¡Borrado!', icon: 'success', timer: 1000, showConfirmButton: false });
      }
    });
  };

  const eliminarHistorialCompleto = () => {
    Swal.fire({
      title: '¿Vaciar todo el historial?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#c0392b',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'No, volver'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("historialCotizaciones");
        setCotizaciones([]);
        Swal.fire('¡Vaciado!', 'Tu historial está limpio.', 'success');
      }
    });
  };

  // Estilo base para los botones de acción (reutilizable)
  const botonEstiloBase = {
    padding: '12px 25px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '2px solid'
  };

  if (cotizaciones.length === 0) {
    return (
      <div className="container" style={{marginTop: '20px', padding: '40px', textAlign: 'center'}}>
        <h2>Historial Vacío</h2>
        <p>Aún no has guardado ninguna cotización.</p>
        <button 
          onClick={volver} 
          style={{ ...botonEstiloBase, backgroundColor: 'transparent', color: 'var(--primary)', borderColor: 'var(--primary)', marginTop: '20px' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
        >
          Volver al Cotizador
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{marginTop: '20px', padding: '40px'}}>
      <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Tu Historial de Cotizaciones</h2>
      
      {cotizaciones.map((c) => (
        <div key={c.id} className="resumen" style={{marginBottom: '15px', borderRadius: '8px', border: '1px solid #eee', padding: '15px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <p style={{fontSize: '0.85rem', color: '#666'}}>{c.fecha}</p>
              <p><strong>Propiedad:</strong> {c.vivienda} en {c.ubicacion}</p>
              <p><strong>Cobertura:</strong> {c.plan}</p>
            </div>
            <div style={{textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <p style={{fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--accent)'}}>${c.precio}</p>
              <button onClick={() => eliminarCotizacion(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }} title="Eliminar">🗑️</button>
            </div>
          </div>
        </div>
      ))}

      <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px'}}>
        {/* BOTÓN VOLVER (Estilo Ghost Primary) */}
        <button 
          onClick={volver} 
          style={{ ...botonEstiloBase, backgroundColor: 'transparent', color: '#2c3e50', borderColor: '#2c3e50' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2c3e50'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2c3e50'; }}
        >
          ⬅ Volver
        </button>

        {/* BOTÓN VACIAR (Estilo Ghost Danger) */}
        <button 
          onClick={eliminarHistorialCompleto} 
          style={{ ...botonEstiloBase, backgroundColor: 'transparent', color: '#c0392b', borderColor: '#c0392b' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#c0392b'; e.currentTarget.style.color = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c0392b'; }}
        >
          🗑 Vaciar Historial
        </button>
      </div>
    </div>
  );
};

export default Historial;