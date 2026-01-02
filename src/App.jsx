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
                    
                    {/* SECCIÓN DEL BOTÓN */}
                    <div style={{ 
                        textAlign: 'center', 
                        margin: '30px 0', 
                        padding: '0 20px' 
                    }}>
                        <button 
                            className="btn-historial-estilizado" 
                            onClick={() => setVerHistorial(true)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--primary)',
                                border: '2px solid var(--primary)',
                                padding: '12px 25px',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>📋</span> Ver Mi Historial
                        </button>
                    </div>

                    <main className="container" id="cotizador-seccion">
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