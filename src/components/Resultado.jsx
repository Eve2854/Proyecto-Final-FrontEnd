 import React, { useState } from 'react';

const Resultado = ({ cotizacion, datosCotizados }) => {
  const [guardado, setGuardado] = useState(false);

  // Si no hay cotización, no mostramos el componente
  if (!cotizacion) return null;

  const handleGuardar = (e) => {
    // 🔑 IMPORTANTE: Evita que el formulario se recargue o dispare otras funciones
    e.preventDefault();
    e.stopPropagation();

    try {
      // 1. Buscamos lo que ya existe en el historial
      const historialPrevio = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];

      // 2. Armamos el objeto con los datos que ya tenemos
      const nuevaCotizacion = {
        id: Date.now(),
        fecha: new Date().toLocaleDateString(),
        // Usamos los datos que vienen por props
        detalle: datosCotizados.tipoHogar || "Seguro de Hogar",
        monto: cotizacion.valor,
        cobertura: cotizacion.plan || "Plan Estándar"
      };

      // 3. Guardamos
      const nuevoHistorial = [nuevaCotizacion, ...historialPrevio];
      localStorage.setItem("historialCotizaciones", JSON.stringify(nuevoHistorial));

      // 4. Cambiamos el estado local del botón
      setGuardado(true);

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar la cotización");
    }
  };

  return (
    <div className="resultado-container">
      <h2>Opciones de Cobertura</h2>
      
      <div className="opciones-grid">
        <div className="cobertura-card">
          <h3>{cotizacion.plan || "Cobertura Recomendada"}</h3>
          <p>Protección completa según los datos ingresados.</p>
          <div className="costo-final">${cotizacion.valor}</div>
          <button className="btn-seleccionar" onClick={() => alert("¡Gracias por elegirnos!")}>
            Seleccionar Plan
          </button>
        </div>
      </div>

      {/* --- EL BOTÓN DE GUARDAR CORREGIDO --- */}
      <div style={{ marginTop: '30px' }}>
        <button 
          type="button" // 🔑 Evita que se comporte como un "submit" de formulario
          className="btn-guardar" 
          onClick={handleGuardar}
          disabled={guardado}
        >
          {guardado ? "✅ Cotización Guardada" : "💾 Guardar esta Cotización"}
        </button>
      </div>

      {guardado && (
        <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: '10px' }}>
          La puedes revisar cuando quieras en tu historial.
        </p>
      )}
    </div>
  );
};

export default Resultado;