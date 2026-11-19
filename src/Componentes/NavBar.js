import React, { useState, useEffect, useRef } from 'react';
import logo from '../Imagenes/LogoNav.svg';
import { REDES, WHATSAPP_URL } from '../Data/contacto';
import '../Estilos/NavBarStyle.css';

/* Íconos de línea para cada sección (usados en la barra inferior móvil) */
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

const IconProceso = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><path d="M6 7v10M11 5h9M11 19h9M11 12h6" />
    </svg>
);

/* Mismos links en desktop (arriba) y móvil (abajo). En los dos, "Inicio" es el
   logo y "Contacto" es el botón "Cotizar". */
const links = [
    { href: '#entornos', label: 'Servicios', Icon: IconServicios },
    { href: '#proyectos', label: 'Proyectos', Icon: IconProyectos },
    { href: '#proceso', label: 'Proceso', Icon: IconProceso },
    { href: '#nosotros', label: 'Sobre mí', Icon: IconNosotros }, // trabajo solo: no "Nosotros"
];
// También se observan el hero y contacto: ahí ningún link queda activo
const seccionesObservadas = ['#home', ...links.map(l => l.href), '#contacto'];

const NavBar = () => {
    const [active, setActive] = useState('#home');
    const [compacta, setCompacta] = useState(false);
    const [barraOculta, setBarraOculta] = useState(false);
    const bloqueoHasta = useRef(0);
    const ultimoY = useRef(0);

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

        seccionesObservadas.forEach((href) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Arriba: compacta al bajar. Abajo (móvil): se esconde al bajar (leyendo) y vuelve
    // al subir, arriba de todo o al llegar al final. React no re-renderiza si no cambia.
    useEffect(() => {
        const alHacerScroll = () => {
            const y = window.scrollY;
            setCompacta(y > 8);
            const delta = y - ultimoY.current;
            if (Math.abs(delta) < 8) return; // ignora el temblor del dedo
            ultimoY.current = y;
            const alFinal = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
            // Durante un scroll iniciado por la barra, no esconderla
            const porLaBarra = Date.now() < bloqueoHasta.current;
            setBarraOculta(delta > 0 && y > 120 && !alFinal && !porLaBarra);
        };
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

    // En el hero y en contacto no hay link activo: las pills se ocultan
    const indiceActivo = links.findIndex(l => l.href === active);
    const pill = { '--i': Math.max(0, indiceActivo), '--n': links.length };

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

                <div className={`nav-centro ${indiceActivo < 0 ? 'sin-activo' : ''}`} style={pill}>
                    <span className="nav-pill" aria-hidden="true" />
                    <ul className="nav-links">
                        {links.map(({ href, label }) => (
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
            {/* Mismos links que arriba; la pill azul se desliza a la sección activa */}
            <nav
                className={`bottom-nav ${barraOculta ? 'is-oculta' : ''} ${indiceActivo < 0 ? 'sin-activo' : ''}`}
                aria-label="Secciones"
                style={pill}
            >
                <span className="bottom-pill" aria-hidden="true" />
                {links.map(({ href, label, Icon }) => (
                    <button
                        key={href}
                        type="button"
                        className={`bottom-nav-item ${active === href ? 'active' : ''}`}
                        onClick={() => irA(href)}
                        aria-current={active === href ? 'true' : undefined}
                    >
                        <Icon />
                        <span className="bottom-nav-label">{label}</span>
                    </button>
                ))}
            </nav>
        </>
    );
};

export default NavBar;
