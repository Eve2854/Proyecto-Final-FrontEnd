 import React, { useState } from 'react';

// Se reciben las funciones setResultado y setCargando desde App.jsx
const Formulario = ({ setResultado, setCargando }) => {
    // 1. ESTADO INTERNO
    const [datos, setDatos] = useState({
        nombre: '',
        vivienda: '',
        metros: '',
        antiguedad: '',
        reclamos: 'no' // Valor por defecto
    });

    const [error, setError] = useState('');

    // 2. HANDLER DE CAMBIOS
    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    // 3. LÓGICA DE COTIZACIÓN
    const cotizarSeguro = () => {
        // --- CÁLCULOS DE COTIZACIÓN ---
        
        const COSTO_BASE = 800;
        let costoFinal = COSTO_BASE;

        // Factores de Propiedad (ejemplo simple)
        const factorVivienda = { casa: 1.2, departamento: 1.1, duplex: 1.3, cabaña: 1.4 };
        // Si no se encuentra la vivienda, el factor es 1
        costoFinal *= factorVivienda[datos.vivienda] || 1; 

        // Ajuste por Metros y Antigüedad 
        // Nota: Aseguramos que los valores sean números antes de sumar
        const metros = parseFloat(datos.metros) || 0;
        const antiguedad = parseFloat(datos.antiguedad) || 0;
        
        costoFinal += metros * 5;
        costoFinal += antiguedad * 10;
        
        // Factor de Reclamos (40% de incremento si tiene historial)
        costoFinal *= datos.reclamos === 'si' ? 1.4 : 1; 

        // --- OPCIONES DE COBERTURA ---
        const opcionesCobertura = [
            { 
                nombre: 'Básica', 
                descripcion: 'Cubre daños estructurales y robo.',
                costo: costoFinal * 1.05 // +5% sobre el costo base ajustado
            },
            { 
                nombre: 'Completa', 
                descripcion: 'Cubre todo riesgo, desastres naturales y asistencia legal.',
                costo: costoFinal * 1.30 // +30% sobre el costo base ajustado
            },
        ];

        // --- ACTUALIZACIÓN DE ESTADO ---
        
        // 1. Iniciar la carga
        setCargando(true); 
        setResultado(null); 
        
        // 2. Simular tiempo de procesamiento y actualizar el resultado
        setTimeout(() => {
            setCargando(false); 
            setResultado({
                datos: datos,
                opciones: opcionesCobertura
            });
        }, 1000); 
    };

    // 4. SUBMIT Y VALIDACIÓN
    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, vivienda, metros, antiguedad } = datos;

        // Validación: Verifica que los campos críticos no estén vacíos o sean inválidos
        if ([nombre, vivienda, metros, antiguedad].some(campo => campo.trim() === '') || 
            isNaN(parseFloat(metros)) || isNaN(parseFloat(antiguedad)) || 
            parseFloat(metros) <= 0 || parseFloat(antiguedad) < 0) {
            
            setError('Todos los campos son obligatorios y los valores numéricos deben ser válidos.');
            return;
        }

        setError(''); // Limpiar error
        cotizarSeguro(); 
    };
    
    // 5. RENDERIZADO DEL FORMULARIO
    return (
        <div className="cotizador-content">
            
            {error && <p className="error-message">{error}</p>}
            
            <form className="formulario-cotizador" onSubmit={handleSubmit}>
                
                {/* GRUPO 1: Nombre */}
                <div className="input-group">
                    <label htmlFor="nombre">Nombre Completo:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={datos.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                    />
                </div>

                {/* GRUPO 2: Tipo de Vivienda */}
                <div className="input-group">
                    <label htmlFor="vivienda">Tipo de Vivienda:</label>
                    <select
                        id="vivienda"
                        name="vivienda"
                        value={datos.vivienda}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="duplex">Dúplex/Adosado</option>
                        <option value="cabaña">Cabaña</option>
                    </select>
                </div>

                {/* GRUPO 3: Metros Cuadrados */}
                <div className="input-group">
                    <label htmlFor="metros">Metros Cuadrados (m²):</label>
                    <input
                        type="number"
                        id="metros"
                        name="metros"
                        value={datos.metros}
                        onChange={handleChange}
                        placeholder="Ej. 80"
                        min="10"
                    />
                </div>

                {/* GRUPO 4: Antigüedad */}
                <div className="input-group">
                    <label htmlFor="antiguedad">Antigüedad (años):</label>
                    <input
                        type="number"
                        id="antiguedad"
                        name="antiguedad"
                        value={datos.antiguedad}
                        onChange={handleChange}
                        placeholder="Ej. 5"
                        min="0"
                    />
                </div>

                {/* GRUPO 5: Historial de Reclamos (Radio Group) */}
                <div className="radio-group">
                    <label>¿Tiene historial de reclamaciones?</label>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="reclamos"
                                value="si"
                                checked={datos.reclamos === 'si'}
                                onChange={handleChange}
                            /> Sí
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="reclamos"
                                value="no"
                                checked={datos.reclamos === 'no'}
                                onChange={handleChange}
                            /> No
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn-cotizar">
                    Calcular Opciones de Cobertura
                </button>
            </form>
        </div>
    );
};

export default Formulario;