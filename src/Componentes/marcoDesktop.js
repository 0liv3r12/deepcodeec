import React from 'react';
import '../Estilos/marcos.css';

/* Marco de monitor dibujado en CSS (no imagen), con barra tipo navegador,
   cuello y base. 'children' es el contenido de la pantalla. */
const MarcoDesktop = ({ children }) => {
    return (
        <div className="marco-desktop">
            <div className="marco-desktop-monitor">
                <div className="marco-desktop-bar">
                    <span className="marco-dot r" />
                    <span className="marco-dot y" />
                    <span className="marco-dot g" />
                    <div className="marco-desktop-url">deepcode.app</div>
                </div>
                <div className="marco-desktop-screen">
                    {children}
                </div>
            </div>
            <div className="marco-desktop-neck" />
            <div className="marco-desktop-base" />
        </div>
    );
};

export default MarcoDesktop;