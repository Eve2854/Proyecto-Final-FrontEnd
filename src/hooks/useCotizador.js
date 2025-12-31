 import { useState } from 'react';
import { calcularOpcionesCotizacion } from '../utils/calculadora';

const useCotizador = () => {
    const [datos, setDatos] = useState({
        nombre: '', vivienda: '', metros: '', antiguedad: '', reclamos: 'no'
    });
    const [error, setError] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const ejecutarCotizacion = (e) => {
        e.preventDefault();
        if ([datos.nombre, datos.vivienda, datos.metros].includes('')) {
            setError('Por favor, completa los campos principales.');
            return;
        }
        setError(null);
        setCargando(true);
        setResultado(null);

        setTimeout(() => {
            const opciones = calcularOpcionesCotizacion(datos);
            setResultado({ datos, opciones });
            setCargando(false);
        }, 1200);
    };

    return { datos, error, resultado, cargando, handleChange, ejecutarCotizacion };
};

export default useCotizador;