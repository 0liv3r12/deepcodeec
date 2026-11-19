import React, { useEffect, useRef, useState } from 'react';
import MarcaD from '../Componentes/MarcaD';
import { WHATSAPP_URL } from '../Data/contacto';
import '../Estilos/home.css';

const TITULO = ['Software', 'a', 'medida', 'que'];
const TITULO_DESTACADO = ['trabaja', 'por', 'tu', 'negocio.'];

const STACK = [
    'React', 'Flutter', 'React Native', 'Node.js', 'Express', 'Prisma',
    'PostgreSQL', 'MySQL', 'Firebase', 'Electron', 'JavaScript', 'Dart',
];

/* Cada palabra sube desde una máscara (solo CSS, empieza de inmediato). */
const Palabras = ({ lista, desde = 0 }) => lista.map((p, i) => (
    <React.Fragment key={p}>
        <span className="palabra"><span style={{ '--i': desde + i }}>{p}</span></span>{' '}
    </React.Fragment>
));

const soportaWebGL = () => {
    try {
        const c = document.createElement('canvas');
        return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
        return false;
    }
};

/* Visual del hero: SVG estático del <D> (no bloquea el LCP) y, cuando conviene,
   la escena 3D en un chunk aparte con crossfade al canvas.
   - Se carga con la primera interacción (en desktop basta mover el mouse) y en
     el siguiente momento libre: la carga inicial queda sin bloqueos y el SVG
     flota con CSS mientras tanto.
   - Sin WebGL o con ahorro de datos: se queda el SVG. */
const EscenaHero = () => {
    const hostRef = useRef(null);
    const [listo, setListo] = useState(false);

    useEffect(() => {
        if (navigator.connection?.saveData) return undefined;

        const movil = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
        const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const eventos = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown'];
        let cancelado = false;
        let iniciado = false;
        let destruir = null;
        let idle = 0;

        const quitarDisparadores = () => eventos.forEach((ev) => window.removeEventListener(ev, alInteractuar));

        const cargar = () => {
            if (cancelado || !soportaWebGL()) return;
            import(/* webpackChunkName: "hero3d" */ '../Componentes/Hero3D')
                .then(({ default: montarEscena }) => {
                    if (cancelado || !hostRef.current) return;
                    destruir = montarEscena(hostRef.current, { movil, reducido, onListo: () => setListo(true) });
                })
                .catch(() => { /* sin 3D: queda el SVG */ });
        };

        // La primera interacción programa la carga en un momento libre, sin trabar ese gesto
        function alInteractuar() {
            if (iniciado) return;
            iniciado = true;
            quitarDisparadores();
            idle = 'requestIdleCallback' in window
                ? window.requestIdleCallback(cargar, { timeout: 1000 })
                : window.setTimeout(cargar, 200);
        }

        eventos.forEach((ev) => window.addEventListener(ev, alInteractuar, { passive: true }));

        return () => {
            cancelado = true;
            quitarDisparadores();
            if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle);
            window.clearTimeout(idle);
            destruir?.();
        };
    }, []);

    return (
        <div className={`hero-visual ${listo ? 'is-listo' : ''}`}>
            <MarcaD className="hero-marca" acabado />
            <div className="hero-canvas" ref={hostRef} aria-hidden="true" />
        </div>
    );
};

const ListaStack = (props) => (
    <ul className="marquee-track" {...props}>
        {STACK.map((t) => (
            <li key={t}>
                <span className="marquee-br" aria-hidden="true">&lt;</span>{t}<span className="marquee-br" aria-hidden="true">/&gt;</span>
            </li>
        ))}
    </ul>
);

const Home = () => {
    return (
        <section id="home">
            <div className="home-container">
                <div className="text-content">
                    <span className="hero-eyebrow">
                        <span className="hero-dot" aria-hidden="true" />
                        Software a medida · Loja, Ecuador
                    </span>

                    <h1 className="hero-title">
                        <Palabras lista={TITULO} />
                        <span className="highlight">
                            <Palabras lista={TITULO_DESTACADO} desde={TITULO.length} />
                        </span>
                    </h1>

                    <p className="hero-description">
                        Creo sitios web, apps móviles, programas de escritorio y bases de datos
                        que automatizan lo manual, te permiten cobrar en línea y ordenan la
                        información de tu negocio.
                    </p>

                    <div className="hero-cta">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            aria-label="Cotiza tu proyecto por WhatsApp"
                        >
                            Cotiza tu proyecto <span className="btn-arrow" aria-hidden="true">→</span>
                        </a>
                        <a href="#proyectos" className="btn-secondary">Ver proyectos</a>
                    </div>
                </div>

                <EscenaHero />
            </div>

            {/* Cinta infinita del stack (solo CSS). La copia es decorativa. */}
            <div className="marquee">
                <div className="marquee-inner">
                    <ListaStack aria-label="Tecnologías con las que trabajo" />
                    <ListaStack aria-hidden="true" />
                </div>
            </div>
        </section>
    );
};

export default Home;
