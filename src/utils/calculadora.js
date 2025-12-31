 export const calcularOpcionesCotizacion = (datos) => {
    const { vivienda, metros, antiguedad, reclamos } = datos;

    // 1. Costo Base por m2
    const COSTO_BASE_M2 = 300;
    let subTotal = parseFloat(metros) * COSTO_BASE_M2;

    // 2. Factores de Vivienda
    const factoresVivienda = { casa: 1.2, departamento: 1.0, duplex: 1.1, cabaña: 1.3 };
    subTotal *= (factoresVivienda[vivienda] || 1.0);

    // 3. Factor Antigüedad
    const años = parseInt(antiguedad);
    if (años >= 20) subTotal *= 0.8;
    else if (años >= 10) subTotal *= 0.9;
    else if (años >= 5) subTotal *= 0.95;

    // 4. Recargo por Reclamos
    if (reclamos === 'si') subTotal *= 1.3;

    // 5. Retornar Opciones
    return [
        {
            nombre: 'Básica',
            multiplicador: 1.0,
            descripcion: 'Cubre únicamente daños estructurales, incendio y daños por agua.',
            costo: subTotal * 1.0
        },
        {
            nombre: 'Estándar',
            multiplicador: 1.5,
            descripcion: 'Incluye la Básica más robo de contenido, daños eléctricos y cristales.',
            costo: subTotal * 1.5
        },
        {
            nombre: 'Premium',
            multiplicador: 2.2,
            descripcion: 'Máxima cobertura: Estándar, fenómenos naturales y asistencia en el hogar.',
            costo: subTotal * 2.2
        }
    ];
};