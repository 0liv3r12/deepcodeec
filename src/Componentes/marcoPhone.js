import React from 'react';
import '../Estilos/marcos.css';

/* Marco de celular dibujado en CSS (no imagen), con notch y botones laterales.
   'children' es el contenido de la pantalla (imagen/video del carrusel). */
const MarcoPhone = ({ children }) => {
    return (
        <div className="marco-phone">
            <div className="marco-phone-btn marco-phone-btn-volume" />
            <div className="marco-phone-btn marco-phone-btn-power" />
            <div className="marco-phone-body">
                <div className="marco-phone-notch">
                    <span className="marco-phone-speaker" />
                    <span className="marco-phone-cam" />
                </div>
                <div className="marco-phone-screen">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MarcoPhone;