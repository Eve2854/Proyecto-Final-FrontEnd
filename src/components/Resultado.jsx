 import React from 'react';

// Función robusta para formatear a moneda
const formatearMoneda = (cantidad) => {
    // Aseguramos que la cantidad sea un número válido antes de formatear
    const valorNumerico = parseFloat(cantidad);
    if (isNaN(valorNumerico)) {
        return 'N/A';
    }
    
    return valorNumerico.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });
};

const Resultado = ({ resultado }) => {
    // 🔑 VALIDACIÓN CLAVE: Aseguramos que 'resultado' y 'opciones' existan antes de desestructurar
    if (!resultado || !resultado.datos || !resultado.opciones) {
        // Esto previene fallos si el componente se renderiza en un estado incompleto
        return null; 
    }
    
    const { datos, opciones } = resultado;

    // Si la cotización está vacía
    if (opciones.length === 0) {
        return <p className="loading">No se encontraron opciones de cobertura para los datos ingresados.</p>;
    }

    return (
        <div className="cotizador-content resultado-container">
            <h2>🎉 Opciones de Cobertura para {datos.nombre}</h2>

            {/* Resumen de los datos cotizados */}
            <div className="resumen">
                <p>Vivienda: **{datos.vivienda.charAt(0).toUpperCase() + datos.vivienda.slice(1)}** | 
                   Metros: **{datos.metros} m²** | 
                   Antigüedad: **{datos.antiguedad} años** | 
                   Reclamos: **{datos.reclamos === 'si' ? 'Sí' : 'No'}**
                </p>
            </div>

            {/* Grid de Opciones de Cobertura */}
            <div className="opciones-grid">
                {opciones.map((opcion) => (
                    <div key={opcion.nombre} className="cobertura-card">
                        <h3>{opcion.nombre}</h3>
                        <p className="descripcion">{opcion.descripcion || 'Sin descripción.'}</p>
                        <p>Costo Anual:</p>
                        {/* Usamos la función de formateo robusta */}
                        <p className="costo-final">{formatearMoneda(opcion.costo)}</p>
                        <button className="btn-seleccionar">
                            Seleccionar Opción
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resultado;