import React, { useState, useEffect, useRef } from 'react';
import logo from '../Imagenes/LogoNav.svg';
import { REDES, WHATSAPP_URL } from '../Data/contacto';
import '../Estilos/NavBarStyle.css';

/* Íconos de línea para cada sección (usados en la barra inferior móvil) */
const IconInicio = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" />
    </svg>
);
const IconServicios = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
);
const IconProyectos = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7l2-3h5l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
);
const IconNosotros = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
);

const IconContacto = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" />
    </svg>
);

/* `donde`: 'movil' solo en la barra inferior, 'desktop' solo arriba.
   Arriba no va "Inicio" (lo hace el logo) ni "Contacto" (lo hace "Cotizar")
   para que entren hasta 769px; abajo no va "Proceso" para que quepa a 390px. */
const links = [
    { href: '#home', label: 'Inicio', Icon: IconInicio, donde: 'movil' },
    { href: '#entornos', label: 'Servicios', Icon: IconServicios },
    { href: '#proyectos', label: 'Proyectos', Icon: IconProyectos },
    { href: '#proceso', label: 'Proceso', donde: 'desktop' },
    { href: '#nosotros', label: 'Sobre mí', Icon: IconNosotros }, // trabajo solo: no "Nosotros"
    { href: '#contacto', label: 'Contacto', Icon: IconContacto, donde: 'movil' },
];
const linksArriba = links.filter(l => l.donde !== 'movil');
const linksAbajo = links.filter(l => l.donde !== 'desktop');

const NavBar = () => {
    const [active, setActive] = useState('#home');
    const [compacta, setCompacta] = useState(false);
    const bloqueoHasta = useRef(0);

    // Sección activa según lo que está en el centro de la pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && Date.now() > bloqueoHasta.current) {
                        setActive(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        links.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Barra compacta al bajar (React no re-renderiza si el valor no cambia)
    useEffect(() => {
        const alHacerScroll = () => setCompacta(window.scrollY > 8);
        alHacerScroll();
        window.addEventListener('scroll', alHacerScroll, { passive: true });
        return () => window.removeEventListener('scroll', alHacerScroll);
    }, []);

    const irA = (href) => {
        setActive(href);
        // Durante el scroll suave no marcar las secciones intermedias (la pill rebotaría)
        bloqueoHasta.current = Date.now() + 1200;
        window.addEventListener('scrollend', () => { bloqueoHasta.current = 0; }, { once: true });
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // En el hero no hay link activo arriba: la pill se oculta
    const indiceActivo = linksArriba.findIndex(l => l.href === active);

    return (
        <>
            {/* ── Barra superior (logo + links desktop + redes + Cotizar) ── */}
            <nav className={`navbar ${compacta ? 'is-compacta' : ''}`} aria-label="Principal">
                <a
                    href="/"
                    className="logo-link"
                    onClick={(e) => { e.preventDefault(); irA('#home'); }}
                >
                    <img src={logo} alt="DeepCodeEc" className="logo-img" width="224" height="32" />
                </a>

                <div
                    className={`nav-centro ${indiceActivo < 0 ? 'sin-activo' : ''}`}
                    style={{ '--i': Math.max(0, indiceActivo), '--n': linksArriba.length }}
                >
                    <span className="nav-pill" aria-hidden="true" />
                    <ul className="nav-links">
                        {linksArriba.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={active === href ? 'activo' : ''}
                                    aria-current={active === href ? 'true' : undefined}
                                    onClick={(e) => { e.preventDefault(); irA(href); }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="nav-acciones">
                    <div className="redes">
                        {REDES.map(({ href, label, d }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="red-link" aria-label={label}>
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
                            </a>
                        ))}
                    </div>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary nav-cta">
                        Cotizar <span className="btn-arrow" aria-hidden="true">→</span>
                    </a>
                </div>
            </nav>

            {/* ── Barra inferior flotante (solo móvil) ── */}
            <nav className="bottom-nav" aria-label="Secciones">
                {linksAbajo.map(({ href, label, Icon }) => (
                    <button
                        key={href}
                        type="button"
                        className={`bottom-nav-item ${active === href ? 'active' : ''}`}
                        onClick={() => irA(href)}
                        aria-label={label}
                        aria-current={active === href ? 'true' : undefined}
                    >
                        <span className="bottom-nav-icon"><Icon /></span>
                        <span className="bottom-nav-label" aria-hidden="true">{label}</span>
                    </button>
                ))}
            </nav>
        </>
    );
};

export default NavBar;
