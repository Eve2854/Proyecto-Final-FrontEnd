// Factores estáticos de la póliza y costos base
export const factoresBase = {
    COSTO_BASE_M2: 300, // Costo de referencia por metro cuadrado (puedes ajustarlo)
    
    // Multiplicador por Tipo de Propiedad (mayor riesgo, mayor factor)
    FACTORES_PROPIEDAD: { 
        casa: 1.2, 
        departamento: 1.0, 
        local: 1.4,
        duplex: 1.1
    },

    // Descuento por Antigüedad (las propiedades más antiguas pueden tener descuento por ser de construcción sólida, o recargo si son muy viejas y requieren más mantenimiento. Aquí se usa descuento)
    FACTORES_ANTIGUEDAD: { 
        0: 1.0,  // Nuevo o hasta 4 años
        5: 0.95, // 5 a 9 años (5% descuento)
        10: 0.9, // 10 a 19 años (10% descuento)
        20: 0.8  // 20 años o más (20% descuento)
    }, 

    // Recargo por Historial de Reclamaciones (mayor riesgo)
    FACTOR_RECLAMOS: { 
        si: 1.3, // 30% de recargo si hay historial
        no: 1.0  // Sin recargo
    } 
};

/**
 * Función principal para calcular el costo de las diferentes opciones de cobertura.
 * @param {object} datos - Datos del formulario del usuario.
 * @param {object} factores - Factores estáticos de la póliza.
 * @returns {Array} Opciones de cobertura y costo final.
 */
export const calcularOpcionesCotizacion = (datos, factores) => {
    const { tipoPropiedad, metrosCuadrados, antiguedad, historialReclamaciones } = datos;

    // 1. Cálculo del Costo Base (Metros Cuadrados)
    let costoBase = parseFloat(metrosCuadrados) * factores.COSTO_BASE_M2;

    // 2. Aplicar Factor por Tipo de Propiedad
    let factorPropiedad = factores.FACTORES_PROPIEDAD[tipoPropiedad] || 1.0;
    
    // 3. Aplicar Factor por Antigüedad (selecciona el factor más aplicable)
    let factorAntiguedad = 1.0;
    if (antiguedad >= 20) factorAntiguedad = factores.FACTORES_ANTIGUEDAD[20];
    else if (antiguedad >= 10) factorAntiguedad = factores.FACTORES_ANTIGUEDAD[10];
    else if (antiguedad >= 5) factorAntiguedad = factores.FACTORES_ANTIGUEDAD[5];
    
    // 4. Aplicar Factor por Historial de Reclamaciones (Riesgo)
    let factorReclamos = factores.FACTOR_RECLAMOS[historialReclamaciones] || 1.0;

    // 5. Cálculo del Subtotal Ajustado
    // Subtotal = Costo Base * Factor Propiedad * Factor Antigüedad * Factor Reclamos
    let subTotal = costoBase * factorPropiedad * factorAntiguedad * factorReclamos;

    // 6. Generación de Opciones de Cobertura con diferentes multiplicadores
    const opciones = [
        {
            nombre: 'Básica',
            multiplicador: 1.0, // Costo base ajustado
            descripcion: 'Cubre únicamente daños estructurales, incendio y daños por agua. Mínima protección.',
        },
        {
            nombre: 'Estándar',
            multiplicador: 1.5, // 50% extra sobre el subtotal
            descripcion: 'Incluye la Básica más robo de contenido, daños eléctricos y cristales.',
        },
        {
            nombre: 'Premium',
            multiplicador: 2.2, // 120% extra sobre el subtotal
            descripcion: 'Máxima cobertura: Estándar, fenómenos naturales, responsabilidad civil y asistencia en el hogar.',
        },
    ];

    // 7. Calcular el costo final y darle formato de moneda (ARS)
    const resultadoCotizacion = opciones.map(opcion => ({
        ...opcion,
        // Aplica el multiplicador y formatea el número a moneda local
        costo: (subTotal * opcion.multiplicador).toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0 // Sin decimales para montos grandes
        }),
    }));

    return resultadoCotizacion;
};