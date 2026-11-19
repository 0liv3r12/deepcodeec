import React, { useLayoutEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { buscarProyecto, colorDeepCode } from '../Data/proyectosData';
import { whatsapp } from '../Data/contacto';
import GaleriaDispositivo from '../Componentes/Portafolio/GaleriaDispositivo';
import DetalleProyecto from '../Componentes/Portafolio/DetalleProyecto';
import { nombreTransicion } from '../Componentes/Portafolio/ListaProyectos';
import LinkTransicion from '../Componentes/LinkTransicion';
import Footer from '../Componentes/Footer';
import '../Estilos/proyectoLanding.css';
import logo from '../Imagenes/LogoNav.svg';

const ProyectoLanding = () => {
    const { entornoId, proyectoId } = useParams();
    const encontrado = buscarProyecto(entornoId, proyectoId);
    const items = encontrado?.proyecto.galeria || [];

    // Al entrar, arriba de todo (en el mismo commit, así la transición de página ya lo muestra)
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [entornoId, proyectoId]);

    if (!encontrado || items.length === 0) {
        return <Navigate to="/#proyectos" replace />;
    }

    const { entorno, proyecto } = encontrado;
    const color = proyecto.color || colorDeepCode;

    return (
        <div className="pl-page" style={{ '--acc-from': color.from, '--acc-to': color.to }}>
            <nav className="pl-nav" aria-label="Proyecto">
                <LinkTransicion to="/#proyectos" className="pl-volver">
                    <span className="pl-volver-flecha" aria-hidden="true">←</span> Proyectos
                </LinkTransicion>
                <LinkTransicion to="/" className="pl-logo-link">
                    <img src={logo} alt="DeepCodeEc, ir al inicio" className="pl-logo" width="196" height="28" />
                </LinkTransicion>
                <span className="pl-nav-entorno">{entorno.nombre}</span>
            </nav>

            <main className="pl-hero">
                <GaleriaDispositivo
                    items={items}
                    nombre={proyecto.nombre}
                    esComputadora={entorno.dispositivo === 'computer'}
                    estiloMarco={{ viewTransitionName: nombreTransicion(entorno.id, proyecto.id) }}
                />
                <DetalleProyecto entorno={entorno} proyecto={proyecto} />
            </main>

            <section className="pl-cta" data-reveal aria-labelledby="pl-cta-titulo">
                <h2 id="pl-cta-titulo">¿Quieres algo así para tu negocio?</h2>
                <p>
                    Cuéntame qué necesitas y te digo cómo lo resolvería, sin compromiso.
                </p>
                <div className="pl-cta-acciones">
                    <a
                        className="btn-primary"
                        href={whatsapp(`Hola DeepCodeEc, vi el proyecto ${proyecto.nombre} y quiero algo así para mi negocio.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Cotiza tu proyecto por WhatsApp"
                    >
                        Cotiza tu proyecto <span className="btn-arrow" aria-hidden="true">→</span>
                    </a>
                    <LinkTransicion to="/#proyectos" className="btn-secondary">Ver más proyectos</LinkTransicion>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProyectoLanding;
