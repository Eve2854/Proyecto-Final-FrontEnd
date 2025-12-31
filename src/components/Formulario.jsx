 import React, { useState } from 'react';

const Formulario = () => {
  const [datos, setDatos] = useState({ vivienda: '', ubicacion: '', metros: '', proteccion: 'basica' });
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [guardado, setGuardado] = useState(false);
  const [mostrarToast, setMostrarToast] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleCotizar = (e) => {
    e.preventDefault();
    setCargando(true);
    setResultado(null);
    setGuardado(false);

    setTimeout(() => {
      const factor = datos.proteccion === 'premium' ? 1.5 : 1.0;
      const precioCalculado = (datos.metros * 125 * factor).toFixed(2);
      
      setResultado({
        plan: datos.proteccion === 'premium' ? "Protección Premium" : "Protección Básica",
        precio: precioCalculado,
        vivienda: datos.vivienda,
        ubicacion: datos.ubicacion,
        detalle: datos.proteccion === 'premium' ? "Todo Riesgo + Cristales" : "Incendio y Robo Básico"
      });
      setCargando(false);
    }, 2000);
  };

  const handleGuardar = () => {
    const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    const nuevaCotizacion = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
      ...resultado
    };
    localStorage.setItem("historialCotizaciones", JSON.stringify([nuevaCotizacion, ...historial]));
    
    setGuardado(true);
    window.dispatchEvent(new Event("storage"));
    
    // Activar cartel lindo
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  return (
    <main className="container">
      <h1>Simulador de Seguro de Hogar</h1>
      
      <form className="formulario-cotizador" onSubmit={handleCotizar}>
        <div className="input-group">
          <label>Tipo de Vivienda</label>
          <select name="vivienda" onChange={handleChange} required>
            <option value="">Selecciona...</option>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="PH">PH</option>
          </select>
        </div>

        <div className="input-group">
          <label>Ubicación (Buenos Aires)</label>
          <select name="ubicacion" onChange={handleChange} required>
            <option value="">Selecciona ciudad...</option>
            <option value="Balcarce">Balcarce</option>
            <option value="Mar del Plata">Mar del Plata</option>
            <option value="Necochea">Necochea</option>
            <option value="Tandil">Tandil</option>
          </select>
        </div>

        <div className="input-group">
          <label>Metros Cuadrados</label>
          <input type="number" name="metros" placeholder="Ej: 60" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Nivel de Protección</label>
          <select name="proteccion" onChange={handleChange}>
            <option value="basica">Protección Básica</option>
            <option value="premium">Protección Premium</option>
          </select>
        </div>

        <button type="submit" className="btn-cotizar">Calcular Opciones</button>
      </form>

      {cargando && <div className="resultado-container"><p className="loading">⏳ Analizando riesgos en {datos.ubicacion}...</p></div>}

      {!cargando && resultado && (
        <div className="resultado-container">
          <h2>Cotización Lista</h2>
          <div className="opciones-grid">
            <div className="cobertura-card">
              <h3>{resultado.plan}</h3>
              <p><strong>Ubicación:</strong> {resultado.ubicacion}</p>
              <div className="costo-final">${resultado.precio}</div>
              <p style={{fontSize: '0.9rem', color: '#666'}}>{resultado.detalle}</p>
            </div>
          </div>
          <button type="button" className="btn-guardar" onClick={handleGuardar} disabled={guardado}>
            {guardado ? "✅ Cotización Guardada" : "💾 Guardar Cotización"}
          </button>
        </div>
      )}

      {/* CARTEL LINDO */}
      {mostrarToast && (
        <div className="custom-toast">
          <span className="toast-icon">✓</span>
          Cotización guardada con éxito
        </div>
      )}
    </main>
  );
};

export default Formulario;