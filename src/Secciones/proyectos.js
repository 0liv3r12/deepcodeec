import React, { useState, useEffect, useCallback } from 'react';
import dwp from '../Imagenes/dwp.png';
import dmp from '../Imagenes/dmp.png';
import dep from '../Imagenes/dep.png';
import bdp from '../Imagenes/bdp.png';
import vDe1 from '../Imagenes/vDe1.png';
import vDe2 from '../Imagenes/vDe2.png';
import vDe3 from '../Imagenes/vDe3.jpg';
import vDe4 from '../Imagenes/vDe4.png';
import vDe5 from '../Imagenes/vDe5.png';
import vid1de from '../Imagenes/vid1de.mp4';
import '../Estilos/proyectos.css';

/* ── Proyectos por entorno ── */
const proyectosPorEntorno = {
    escritorio: [
        {
            id: 1,
            icon: '🖥️',
            nombre: 'Sistema CRUD',
            tags: ['JavaScript', 'MySQL', 'CRUD', 'Dashboard'],
            galeria: [
                { type: 'video', src: vid1de, label: 'Demo del sistema' },
                { type: 'img',   src: vDe1,   label: 'Login' },
                { type: 'img',   src: vDe2,   label: 'Dashboard' },
                { type: 'img',   src: vDe3,   label: 'Clientes' },
                { type: 'img',   src: vDe4,   label: 'Información personal' },
                { type: 'img',   src: vDe5,   label: 'Módulo 5' },
            ],
        },
        // Agrega más proyectos de escritorio aquí
    ],
};

/* ── Cards del grid ── */
const entornos = [
    { id: 'web',       icon: '🌐', nombre: 'Web',           imagen: dwp, descripcion: 'Construimos experiencias web modernas, rápidas y escalables.' },
    { id: 'movil',     icon: '📱', nombre: 'Móvil',         imagen: dmp, descripcion: 'Desarrollamos aplicaciones móviles intuitivas, potentes y multiplataforma.' },
    { id: 'escritorio',icon: '🖥️', nombre: 'Escritorio',    imagen: dep, descripcion: 'Creamos aplicaciones de escritorio robustas, eficientes y adaptadas a tus necesidades.', tieneProyectos: true },
    { id: 'bd',        icon: '🗄️', nombre: 'Base de Datos', imagen: bdp, descripcion: 'Diseñamos y optimizamos bases de datos seguras, eficientes y escalables.' },
];

/* ════ Visor de galería ════ */
const Visor = ({ proyecto }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = proyecto.galeria;
    const current = items[activeIndex];

    const prev = useCallback(() =>
        setActiveIndex(i => (i - 1 + items.length) % items.length), [items.length]);
    const next = useCallback(() =>
        setActiveIndex(i => (i + 1) % items.length), [items.length]);

    useEffect(() => { setActiveIndex(0); }, [proyecto.id]);

    useEffect(() => {
        const vid = document.getElementById('visor-video');
        if (vid) vid.load();
    }, [activeIndex]);

    return (
        <div className="visor-wrapper">
            {/* Tags */}
            {proyecto.tags && (
                <div className="visor-tags">
                    {proyecto.tags.map(t => (
                        <span key={t} className="visor-tag">{t}</span>
                    ))}
                </div>
            )}

            {/* Media principal */}
            <div className="visor-media-wrap">
                <button className="visor-arrow visor-arrow-left" onClick={prev}>‹</button>
                <div className="visor-media">
                    {current.type === 'video' ? (
                        <video id="visor-video" controls playsInline preload="metadata">
                            <source src={current.src} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={current.src} alt={current.label} />
                    )}
                </div>
                <button className="visor-arrow visor-arrow-right" onClick={next}>›</button>
            </div>

            {/* Contador */}
            <div className="visor-counter">
                {current.label} · {activeIndex + 1} / {items.length}
            </div>

            {/* Miniaturas */}
            <div className="visor-thumbs">
                {items.map((item, i) => (
                    <button
                        key={i}
                        className={`visor-thumb ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                        title={item.label}
                    >
                        {item.type === 'video'
                            ? <div className="visor-thumb-video">▶</div>
                            : <img src={item.src} alt={item.label} />
                        }
                    </button>
                ))}
            </div>
        </div>
    );
};

/* ════ Modal con tabs de proyectos ════ */
const ModalProyectos = ({ entornoId, onClose }) => {
    const lista = proyectosPorEntorno[entornoId] || [];
    const [activeProyecto, setActiveProyecto] = useState(lista[0]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-galeria" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="mg-header">
                    <h3 className="mg-titulo">Proyectos de Escritorio</h3>
                    <button className="mg-close" onClick={onClose}>✕</button>
                </div>

                {/* Tabs horizontales */}
                <div className="mg-tabs">
                    {lista.map(p => (
                        <button
                            key={p.id}
                            className={`mg-tab ${activeProyecto?.id === p.id ? 'active' : ''}`}
                            onClick={() => setActiveProyecto(p)}
                        >
                            <span>{p.icon}</span>
                            {p.nombre}
                        </button>
                    ))}
                    {/* Próximos proyectos */}
                    <button className="mg-tab proximamente" disabled>
                        <span>➕</span>
                        Próximamente
                    </button>
                </div>

                {/* Visor */}
                {activeProyecto && (
                    <Visor key={activeProyecto.id} proyecto={activeProyecto} />
                )}
            </div>
        </div>
    );
};

/* ════ Componente principal ════ */
const Proyectos = () => {
    const [modalEntorno, setModalEntorno] = useState(null);

    return (
        <section id="proyectos">
            <div className="proyectos-header animate-on-scroll">
                <span className="section-label">Portafolio</span>
                <h2 className="section-title">
                    Lo que <span className="gradient-text">construimos</span>
                </h2>
                <p className="section-subtitle">
                    Cada entorno, una solución. Haz clic para ver la vista completa.
                </p>
            </div>

            <div className="showcase-wrapper">
                <div className="proyectos-grid">
                    {entornos.map((e, i) => (
                        <div
                            key={e.id}
                            className="proyecto-card animate-on-scroll"
                            style={{ transitionDelay: `${i * 0.08}s` }}
                        >
                            <img src={e.imagen} alt={e.nombre} className="proyecto-img" />
                            <div className="proyecto-gradient" />
                            <div className="proyecto-content">
                                <div className="proyecto-icon">{e.icon}</div>
                                <h3 className="proyecto-nombre">{e.nombre}</h3>
                                <p className="proyecto-descripcion">{e.descripcion}</p>
                                {e.tieneProyectos && (
                                    <button
                                        className="proyecto-btn"
                                        onClick={() => setModalEntorno(e.id)}
                                    >
                                        Ver proyectos →
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalEntorno && (
                <ModalProyectos
                    entornoId={modalEntorno}
                    onClose={() => setModalEntorno(null)}
                />
            )}
        </section>
    );
};

export default Proyectos;