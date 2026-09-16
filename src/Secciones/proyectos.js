import React, { useState } from 'react';
import { proyectosPorEntorno, entornos as entornosData } from '../Data/proyectosData';
import '../Estilos/proyectos.css';

/* ── Iconos propios (line icons, sin emoji) ── */
const IconWeb = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4.5" width="18" height="14" rx="2" /><path d="M3 8.5h18" />
    </svg>
);
const IconMovil = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    </svg>
);
const IconEscritorio = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="12" rx="1.6" /><path d="M9 20h6M12 16v4" />
    </svg>
);
const IconBD = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
        <path d="M5 5.5V18.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" />
        <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
);

const iconosPorEntorno = { web: IconWeb, movil: IconMovil, escritorio: IconEscritorio, bd: IconBD };

const proceso = [
    'Empezamos por entender el negocio, no por escribir código.',
    'Diseñamos la interfaz y la validamos antes de construir.',
    'Desarrollamos con buenas prácticas: código limpio y escalable.',
    'Entregamos en producción y acompañamos el crecimiento.',
];

const Proyectos = () => {
    const entornos = entornosData.map(e => {
        const lista = proyectosPorEntorno[e.id] || [];
        return { ...e, Icon: iconosPorEntorno[e.id], lista, count: lista.length };
    });

    const [entornoActivo, setEntornoActivo] = useState(
        entornos.find(e => e.count > 0)?.id || entornos[0].id
    );

    const entorno = entornos.find(e => e.id === entornoActivo);

    return (
        <section id="proyectos">
            <div className="proyectos-header">
                <span className="section-label">Portafolio</span>
                <h2 className="section-title">
                    Software construido <span className="gradient-text">para negocios reales.</span>
                </h2>
                <p className="section-subtitle">
                    Aplicaciones web, móviles y de escritorio desarrolladas de punta a punta.
                </p>
            </div>

            <div className="showcase-wrapper">
                <div className="ph-hero">

                    {/* ═══ IZQUIERDA: tabs de entorno + proyectos ═══ */}
                    <div className="ph-left">
                        <div className="ph-entorno-tabs">
                            {entornos.map(e => (
                                <button
                                    key={e.id}
                                    className={`ph-entorno-tab ${entornoActivo === e.id ? 'active' : ''}`}
                                    onClick={() => setEntornoActivo(e.id)}
                                >
                                    <span className="ph-tab-icon"><e.Icon /></span>
                                    {e.nombre}
                                </button>
                            ))}
                        </div>

                        <div className="ph-proyectos" key={entornoActivo}>
                            {entorno.count === 0 ? (
                                <div className="ph-proyectos-vacio">
                                    Todavía no hay proyectos en {entorno.nombre}.
                                    <span>Próximamente</span>
                                </div>
                            ) : (
                                entorno.lista.map(p => (
                                    <a
                                        key={p.id}
                                        className="ph-proyecto"
                                        href={`/proyecto/${entorno.id}/${p.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="ph-proyecto-media">
                                            <img src={p.portada || p.galeria[1]?.src || p.galeria[0]?.src} alt={p.nombre} loading="lazy" />
                                        </div>
                                        <div className="ph-proyecto-info">
                                            <h5>{p.nombre}</h5>
                                            <span className="ph-proyecto-cta">Ver proyecto ↗</span>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>

                    {/* ═══ DERECHA: proceso + tarjetas de número ═══ */}
                    <div className="ph-right">
                        <div className="ph-proceso">
                            <h3>Cómo trabajamos</h3>
                            <ul>
                                {proceso.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>

                        <div className="ph-nums">
                            {entornos.map(e => (
                                <div key={e.id} className={`ph-num ${e.count === 0 ? 'vacio' : ''}`}>
                                    <div className="ph-num-head">
                                        <span className="ph-tab-icon sm"><e.Icon /></span>
                                        {e.nombre}
                                    </div>
                                    <div className="ph-num-count">{String(e.count).padStart(2, '0')}</div>
                                    <div className="ph-num-label">
                                        {e.count === 0 ? 'Próximamente' : e.count === 1 ? 'proyecto' : 'proyectos'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Proyectos;