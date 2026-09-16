import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { proyectosPorEntorno, entornos } from '../Data/proyectosData';
import MarcoPhone from '../Componentes/marcoPhone';
import MarcoDesktop from '../Componentes/marcoDesktop';
import '../Estilos/proyectoLanding.css';

const ProyectoLanding = () => {
    const { entornoId, proyectoId } = useParams();
    const entorno = entornos.find(e => e.id === entornoId);
    const lista = proyectosPorEntorno[entornoId] || [];
    const proyecto = lista.find(p => String(p.id) === proyectoId);

    const [index, setIndex] = useState(0);
    const items = proyecto ? proyecto.galeria : [];

    const next = useCallback(() => {
        if (items.length) setIndex(i => (i + 1) % items.length);
    }, [items.length]);

    useEffect(() => {
        if (items.length <= 1) return;
        const t = setInterval(next, 2600);
        return () => clearInterval(t);
    }, [next, items.length]);

    useEffect(() => {
        const vid = document.getElementById('landing-video');
        if (vid) vid.load();
    }, [index]);

    if (!entorno || !proyecto) {
        return <Navigate to="/#proyectos" replace />;
    }

    const color = proyecto.color || { from: '#38b6ff', to: '#8b5cf6' };
    const esComputadora = entorno.dispositivo === 'computer';
    const current = items[index];

    const media = current.type === 'video' ? (
        <video id="landing-video" muted playsInline autoPlay loop preload="metadata">
            <source src={current.src} type="video/mp4" />
        </video>
    ) : (
        <img src={current.src} alt={current.label} />
    );

    const Marco = esComputadora ? MarcoDesktop : MarcoPhone;

    return (
        <div className="pl-page" style={{ '--acc-from': color.from, '--acc-to': color.to }}>
            <nav className="pl-nav">
                <span className="pl-logo">DEEP CODE</span>
                <span className="pl-nav-entorno">{entorno.nombre}</span>
            </nav>

            <div className="pl-hero">
                <div className="pl-device-col">
                    <Marco>{media}</Marco>
                    {/* Contador discreto en vez de puntos */}
                    {items.length > 1 && (
                        <div className="pl-counter">
                            <span className="pl-counter-label">{current.label}</span>
                            <span className="pl-counter-num">
                                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                            </span>
                        </div>
                    )}
                </div>

                <div className="pl-copy">
                    <span className="pl-eyebrow">{entorno.nombre} · DeepCode</span>
                    <h1>{proyecto.titular || proyecto.nombre}</h1>
                    <p>{proyecto.descripcion}</p>

                    <div className="pl-tags">
                        {proyecto.tags.map(t => <span key={t} className="pl-tag">{t}</span>)}
                    </div>

                    {proyecto.features && proyecto.features.length > 0 && (
                        <ul className="pl-features">
                            {proyecto.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    )}

                    {proyecto.stack && proyecto.stack.length > 0 && (
                        <div className="pl-stack">
                            <h4>Stack tecnológico</h4>
                            <div className="pl-stack-items">
                                {proyecto.stack.map(s => (
                                    <div key={s} className="pl-stack-chip">{s}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProyectoLanding;