 // src/hooks/useCotizador.js - CÓDIGO COMPLETO
import { useState } from 'react';

const VALORES_INICIALES = {
    nombre: '',
    vivienda: '',
    metros: 0,
    antiguedad: 0,
    reclamos: 'no'
};

const useCotizador = () => {
    
    const [datos, setDatos] = useState(VALORES_INICIALES);
    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(false);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setDatos(prevDatos => ({
            ...prevDatos,
            [name]: type === 'radio' ? (checked ? value : prevDatos[name]) : value
        }));
    };

    // Función principal para cotizar el seguro. (NO usa 'e' ni 'e.preventDefault()')
    const cotizarSeguro = () => {
        
        // 1. Validaciones
        const { nombre, vivienda, metros, antiguedad } = datos;

        if ([nombre, vivienda].includes('') || metros <= 0 || antiguedad < 0) {
            setError('Todos los campos son obligatorios y deben ser válidos.');
            setResultado(null);
            return;
        }

        setError('');
        setCargando(true);

        // 2. Base de cálculo
        let base = 25000; 
        
        // 3. Multiplicador por Tipo de Vivienda
        const multiplicadoresVivienda = {
            'casa': 1.15,
            'departamento': 1.05,
            'duplex': 1.10,
            'cabaña': 1.25
        };
        base *= multiplicadoresVivienda[vivienda] || 1;

        // 4. Multiplicador por Metros Cuadrados
        base += parseFloat(metros) * 50; 

        // 5. Ajuste por Antigüedad
        if (antiguedad < 5) {
            base *= 0.98;
        } else if (antiguedad > 20) {
            base *= 1.05;
        }

        // 6. Ajuste por Historial de Reclamos
        if (datos.reclamos === 'si') {
            base *= 1.10;
        }

        const total = base;

        // 7. Simulación de tiempo de carga y actualización del resultado
        setTimeout(() => {
            setResultado(total);
            setCargando(false);
        }, 1500);
    };

    return {
        datos,
        error,
        resultado,
        cargando,
        handleChange,
        cotizarSeguro // 💡 ESTA FUNCIÓN DEBE SER EXPORTADA
    };
};

export default useCotizador;