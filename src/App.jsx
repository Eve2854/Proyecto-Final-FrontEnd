 import React, { useState } from 'react';
import Header from './components/Header';       // Asegúrate de que la ruta sea correcta
import HeroBanner from './components/HeroBanner'; // Asegúrate de que la ruta sea correcta
import Formulario from './components/Formulario'; // Asegúrate de que la ruta sea correcta
import Resultado from './components/Resultado';   // Asegúrate de que la ruta sea correcta
import Footer from './components/Footer';     // Asegúrate de que la ruta sea correcta

const App = () => {
    // 1. ESTADOS CENTRALES
    // Almacena el resultado de la cotización (datos del usuario + opciones de cobertura)
    const [resultado, setResultado] = useState(null); 
    
    // Almacena el estado de carga mientras se ejecuta el cálculo (simulado por el setTimeout en Formulario)
    const [cargando, setCargando] = useState(false);

    return (
        <div id="root">
            {/* 2. ESTRUCTURA PRINCIPAL */}
            
            <Header />
            <HeroBanner />
            
            <main className="main-content">
                <div className="container">
                    <h1>Simulador de Seguro de Propiedad</h1>

                    {/* 3. FORMULARIO */}
                    {/* Le pasamos las funciones para que pueda actualizar el estado central al cotizar */}
                    <Formulario 
                        setResultado={setResultado} 
                        setCargando={setCargando}
                    /> 

                    {/* 4. VISUALIZACIÓN DE RESULTADOS */}
                    
                    {/* Si está cargando, mostramos un mensaje de carga */}
                    {cargando && <p className="loading">Calculando opciones...</p>}
                    
                    {/* Si NO está cargando Y hay un resultado, mostramos el componente Resultado */}
                    {(!cargando && resultado) && <Resultado resultado={resultado} />}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default App;