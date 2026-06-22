import React, { useState, useEffect, useCallback } from 'react';
import { img } from '../utils/imageLoader';
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
                { type: 'video', src: img('vid1de.mp4'), label: 'Demo del sistema' },
                { type: 'img', src: img('vDe1.png'), label: 'Login' },
                { type: 'img', src: img('vDe2.png'), label: 'Dashboard' },
                { type: 'img', src: img('vDe3.jpg'), label: 'Clientes' },
                { type: 'img', src: img('vDe4.png'), label: 'Información personal' },
                { type: 'img', src: img('vDe5.png'), label: 'Módulo 5' },
                { type: 'img', src: img('vDe6.png'), label: 'Módulo 6' },
            ],
        },
        // Agrega más proyectos de escritorio aquí
    ],
    movil: [
        {
            id: 1,
            icon: '📱',
            nombre: 'Vitaria',
            tags: ['Flutter', 'Dart', 'Citas Médicas', 'UI/UX'],
            galeria: [
                { type: 'video', src: img('vid2dm.mp4'), label: 'Demo de la app' },
                { type: 'img', src: img('vDm1.png'), label: 'Onboarding' },
                { type: 'img', src: img('vDm2.png'), label: 'Login' },
                { type: 'img', src: img('vDm3.png'), label: 'Inicio' },
                { type: 'img', src: img('vDm4.png'), label: 'Especialidades' },
                { type: 'img', src: img('vDm5.png'), label: 'Perfil de médico' },
                { type: 'img', src: img('vDm6.png'), label: 'Selección de fecha' },
                { type: 'img', src: img('vDm7.png'), label: 'Confirmación de cita' },
                { type: 'img', src: img('vDm8.png'), label: 'Mis citas' },
                { type: 'img', src: img('vDm9.png'), label: 'Perfil de usuario' },
                { type: 'img', src: img('vDm10.png'), label: 'Panel admin' },
                { type: 'img', src: img('vDm11.png'), label: 'Calendario admin' },
            ],
        },
        // Agrega más proyectos móviles aquí
    ],
};

/* ── Cards del grid ── */
const entornos = [
    { id: 'web', icon: '🌐', nombre: 'Web', imagen: img('dwp.avif'), descripcion: 'Construimos experiencias web modernas, rápidas y escalables.' },
    { id: 'movil', icon: '📱', nombre: 'Móvil', imagen: img('dmp.avif'), descripcion: 'Desarrollamos aplicaciones móviles intuitivas, potentes y multiplataforma.', tieneProyectos: true },
    { id: 'escritorio', icon: '🖥️', nombre: 'Escritorio', imagen: img('dep.avif'), descripcion: 'Creamos aplicaciones de escritorio robustas, eficientes y adaptadas a tus necesidades.', tieneProyectos: true },
    { id: 'bd', icon: '🗄️', nombre: 'Base de Datos', imagen: img('bdp.avif'), descripcion: 'Diseñamos y optimizamos bases de datos seguras, eficientes y escalables.' },
];

/* ════ Visor de galería ════ */
const Visor = ({ proyecto }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVertical, setIsVertical] = useState(false);
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

    // Detecta si el media activo es vertical (retrato) u horizontal
    useEffect(() => {
        if (current.type === 'img') {
            const img = new Image();
            img.onload = () => setIsVertical(img.naturalHeight > img.naturalWidth);
            img.src = current.src;
        } else {
            // Para video, esperamos metadata
            setIsVertical(false);
        }
    }, [current]);

    const handleVideoMeta = (e) => {
        const v = e.target;
        setIsVertical(v.videoHeight > v.videoWidth);
    };

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
            <div className={`visor-media-wrap ${isVertical ? 'is-vertical' : ''}`}>
                <button className="visor-arrow visor-arrow-left" onClick={prev}>‹</button>
                <div className="visor-media">
                    {current.type === 'video' ? (
                        <video
                            id="visor-video"
                            controls
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={handleVideoMeta}
                        >
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
const ModalProyectos = ({ entornoId, entornoNombre, onClose }) => {
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
                    <h3 className="mg-titulo">Proyectos de {entornoNombre}</h3>
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
                                        onClick={() => setModalEntorno(e)}
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
                    entornoId={modalEntorno.id}
                    entornoNombre={modalEntorno.nombre}
                    onClose={() => setModalEntorno(null)}
                />
            )}
        </section>
    );
};

export default Proyectos;