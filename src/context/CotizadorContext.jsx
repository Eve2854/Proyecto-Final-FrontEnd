 import React, { createContext, useState, useEffect } from 'react';

export const CotizadorContext = createContext();

export const CotizadorProvider = ({ children }) => {
    const [historial, setHistorial] = useState(() => {
        const guardado = localStorage.getItem('historial_cotizaciones');
        return guardado ? JSON.parse(guardado) : [];
    });

    useEffect(() => {
        localStorage.setItem('historial_cotizaciones', JSON.stringify(historial));
    }, [historial]);

    const guardarCotizacion = (nuevaCotizacion) => {
        const cotizacionConMeta = {
            ...nuevaCotizacion,
            id: Date.now(),
            fecha: new Date().toLocaleString()
        };
        setHistorial([cotizacionConMeta, ...historial]);
        alert("¡Cotización guardada en tu historial!");
    };

    const eliminarCotizacion = (id) => {
        setHistorial(historial.filter(item => item.id !== id));
    };

    return (
        <CotizadorContext.Provider value={{ historial, guardarCotizacion, eliminarCotizacion }}>
            {children}
        </CotizadorContext.Provider>
    );
};