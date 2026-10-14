import React from 'react';
import MarcoPhone from '../marcoPhone';
import MarcoDesktop from '../marcoDesktop';

const Media = ({ item }) =>
    item.type === 'video' ? (
        // key: al cambiar de video React lo vuelve a montar y lo recarga
        <video key={item.src} muted playsInline autoPlay loop preload="metadata">
            <source src={item.src} type="video/mp4" />
        </video>
    ) : (
        <img src={item.src} alt={item.label} />
    );

const dosDigitos = (n) => String(n).padStart(2, '0');

const GaleriaDispositivo = ({ items, index, esComputadora }) => {
    const Marco = esComputadora ? MarcoDesktop : MarcoPhone;
    const actual = items[index];

    return (
        <div className="pl-device-col">
            <Marco><Media item={actual} /></Marco>
            {/* Contador discreto en vez de puntos */}
            {items.length > 1 && (
                <div className="pl-counter">
                    <span className="pl-counter-label">{actual.label}</span>
                    <span className="pl-counter-num">
                        {dosDigitos(index + 1)} / {dosDigitos(items.length)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default GaleriaDispositivo;
