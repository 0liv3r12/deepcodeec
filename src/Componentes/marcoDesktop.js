import React from 'react';
import '../Estilos/marcos.css';

/* Marco de monitor dibujado en CSS (no imagen), con barra tipo navegador,
   cuello y base. 'children' es el contenido de la pantalla; 'url' el texto de la barra. */
const MarcoDesktop = ({ children, url = 'deepcodeec.com', style }) => {
    return (
        <div className="marco-desktop" style={style}>
            <div className="marco-desktop-monitor">
                <div className="marco-desktop-bar">
                    <span className="marco-dot r" />
                    <span className="marco-dot y" />
                    <span className="marco-dot g" />
                    <div className="marco-desktop-url">{url}</div>
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