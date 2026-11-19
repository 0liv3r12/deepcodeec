import React, { useEffect, useState } from 'react';
import MarcoPhone from '../marcoPhone';
import MarcoDesktop from '../marcoDesktop';
import useCarrusel from './useCarrusel';

const Media = ({ item, activa, alt, onCargada }) => {
    const clase = `pl-media ${activa ? 'is-activa' : ''}`;
    return item.type === 'video' ? (
        <video className={clase} muted playsInline autoPlay loop preload="metadata"
            onLoadedData={onCargada} aria-hidden={activa ? undefined : 'true'}>
            <source src={item.src} type="video/mp4" />
        </video>
    ) : (
        // La visible baja primero (es el LCP); la que se precarga, después
        <img className={clase} src={item.src} alt={activa ? alt : ''} decoding="async"
            fetchPriority={activa ? 'high' : 'low'}
            onLoad={onCargada} aria-hidden={activa ? undefined : 'true'} />
    );
};

/* Esqueleto con la forma de una pantalla de app (móvil) o de un panel (escritorio/web) */
const EsqueletoPantalla = ({ movil }) => (
    <div className={`pl-esqueleto ${movil ? 'es-movil' : 'es-desktop'}`} aria-hidden="true">
        <span className="sk sk-barra" />
        {!movil && <span className="sk sk-lateral" />}
        <span className="sk sk-tarjeta" />
        <span className="sk sk-linea" />
        <span className="sk sk-linea corta" />
        <span className="sk sk-linea" />
    </div>
);

const Icono = ({ d }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
    </svg>
);

const dosDigitos = (n) => String(n).padStart(2, '0');

const GaleriaDispositivo = ({ items, esComputadora, nombre, estiloMarco }) => {
    const { index, ir, pausado, setPausado, setEnFoco } = useCarrusel(items.length);
    const total = items.length;
    // Solo se montan las capturas ya vistas y la siguiente (se precarga)
    const [montadas, setMontadas] = useState(() => new Set([0, 1 % total]));
    const [cargadas, setCargadas] = useState(() => new Set());

    useEffect(() => {
        setMontadas((prev) => (prev.has(index) && prev.has((index + 1) % total)
            ? prev
            : new Set([...prev, index, (index + 1) % total])));
    }, [index, total]);

    const Marco = esComputadora ? MarcoDesktop : MarcoPhone;
    const actual = items[index];

    return (
        <section
            className="pl-device-col"
            aria-roledescription="carrusel"
            aria-label={`Capturas de ${nombre}`}
            onMouseEnter={() => setEnFoco(true)}
            onMouseLeave={() => setEnFoco(false)}
            onFocus={() => setEnFoco(true)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setEnFoco(false)}
        >
            <Marco url={nombre} style={estiloMarco}>
                {!cargadas.has(index) && <EsqueletoPantalla movil={!esComputadora} />}
                {items.map((item, i) => montadas.has(i) && (
                    <Media
                        key={i}
                        item={item}
                        activa={i === index}
                        alt={`${nombre}: ${item.label}`}
                        onCargada={() => setCargadas((prev) => new Set(prev).add(i))}
                    />
                ))}
            </Marco>

            {total > 1 && (
                <div className="pl-controles">
                    <button type="button" className="pl-control" onClick={() => ir(index - 1)} aria-label="Captura anterior">
                        <Icono d="M15 18l-6-6 6-6" />
                    </button>
                    {/* Con el carrusel corriendo no se anuncia cada cambio */}
                    <div className="pl-counter" aria-live={pausado ? 'polite' : 'off'}>
                        <span className="pl-counter-label">{actual.label}</span>
                        <span className="pl-counter-num">{dosDigitos(index + 1)} / {dosDigitos(total)}</span>
                    </div>
                    <button type="button" className="pl-control" onClick={() => ir(index + 1)} aria-label="Captura siguiente">
                        <Icono d="M9 18l6-6-6-6" />
                    </button>
                    <button
                        type="button"
                        className="pl-control"
                        onClick={() => setPausado((p) => !p)}
                        aria-label={pausado ? 'Reproducir capturas' : 'Pausar capturas'}
                    >
                        <Icono d={pausado ? 'M8 5v14l11-7z' : 'M9 5v14M15 5v14'} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default GaleriaDispositivo;
