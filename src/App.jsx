 // src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Historial from './components/Historial';
import Footer from './components/Footer';
import useCotizador from './hooks/useCotizador';

const App = () => {
    const { datos, error, resultado, cargando, handleChange, ejecutarCotizacion } = useCotizador();
    const [verHistorial, setVerHistorial] = useState(false);

    return (
        <div id="root">
            <Header />
            
            {!verHistorial ? (
                <>
                    <HeroBanner />
                    
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <button className="btn-hero-action" onClick={() => setVerHistorial(true)}>
                            📋 Ver Mi Historial
                        </button>
                    </div>

                    {/* El ID debe estar aquí para que el botón del Hero funcione */}
                    <main className="container" id="cotizador-seccion">
                        <h1>Simulador de Seguro</h1>
                        
                        <Formulario 
                            datos={datos} 
                            handleChange={handleChange} 
                            ejecutarCotizacion={ejecutarCotizacion} 
                            error={error} 
                        />

                        {cargando && <p className="loading">Calculando opciones...</p>}
                        
                        {!cargando && resultado && (
                            <Resultado resultado={resultado} />
                        )}
                    </main>
                </>
            ) : (
                <Historial volver={() => setVerHistorial(false)} />
            )}

            <Footer />
        </div>
    );
};

export default App;