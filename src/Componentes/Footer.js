import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../Imagenes/LogoNav.svg';
import { REDES } from '../Data/contacto';
import LinkTransicion from './LinkTransicion';
import '../Estilos/footer.css';

const secciones = [
    { id: 'entornos', label: 'Servicios' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'nosotros', label: 'Sobre mí' },
    { id: 'contacto', label: 'Contacto' },
];

/* En el home los links hacen scroll a la sección; en otra página vuelven al home. */
const Footer = () => {
    const enInicio = useLocation().pathname === '/';

    const Enlace = ({ id, children, className }) => (enInicio ? (
        <a
            href={`#${id}`}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
        >
            {children}
        </a>
    ) : (
        <LinkTransicion to={`/#${id}`} className={className}>{children}</LinkTransicion>
    ));

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-marca">
                    <Enlace id="home" className="footer-logo">
                        <img src={logo} alt="DeepCodeEc, ir al inicio" width="196" height="28" loading="lazy" />
                    </Enlace>
                    <p>Software a medida que trabaja por tu negocio.</p>
                </div>

                <nav className="footer-nav" aria-label="Secciones del sitio">
                    <ul>
                        {secciones.map((s) => (
                            <li key={s.id}><Enlace id={s.id}>{s.label}</Enlace></li>
                        ))}
                    </ul>
                </nav>

                <ul className="footer-redes" aria-label="Redes de DeepCodeEc">
                    {REDES.map(({ href, label, d }) => (
                        <li key={href}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="footer-legal">
                © {new Date().getFullYear()} DeepCodeEc · Hecho en Loja, Ecuador
            </p>
        </footer>
    );
};

export default Footer;
