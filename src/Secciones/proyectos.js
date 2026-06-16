import React, { useState } from 'react';
import dwp from '../Imagenes/dwp.png';
import dmp from '../Imagenes/dmp.png';
import dep from '../Imagenes/dep.png';
import bdp from '../Imagenes/bdp.png';
import imgEx1 from '../Imagenes/imgEx1.png';
import imgEx2 from '../Imagenes/imgEx2.png';
import imgEx3 from '../Imagenes/imgEx3.png';
import imgEx4 from '../Imagenes/imgEx4.png';
import '../Estilos/proyectos.css';

const proyectos = [
    {
        id: 1,
        icon: '🌐',
        nombre: 'Web',
        descripcion: 'Construimos experiencias web modernas, rápidas y escalables.',
        imagen: dwp,
        imagenModal: imgEx1,
    },
    {
        id: 2,
        icon: '📱',
        nombre: 'Móvil',
        descripcion: 'Desarrollamos aplicaciones móviles intuitivas, potentes y multiplataforma.',
        imagen: dmp,
        imagenModal: imgEx3,
    },
    {
        id: 3,
        icon: '🖥️',
        nombre: 'Escritorio',
        descripcion: 'Creamos aplicaciones de escritorio robustas, eficientes y adaptadas a tus necesidades.',
        imagen: dep,
        imagenModal: imgEx2,
    },
    {
        id: 4,
        icon: '🗄️',
        nombre: 'Base de Datos',
        descripcion: 'Diseñamos y optimizamos bases de datos seguras, eficientes y escalables.',
        imagen: bdp,
        imagenModal: imgEx4,
    },
];

const Proyectos = () => {
    const [modal, setModal] = useState(null);

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
                    {proyectos.map((p, i) => (
                        <div
                            key={p.id}
                            className="proyecto-card animate-on-scroll"
                            style={{ transitionDelay: `${i * 0.08}s` }}
                        >
                            {/* Imagen decorativa derecha */}
                            <img src={p.imagen} alt={p.nombre} className="proyecto-img" />

                            {/* Gradiente sobre imagen */}
                            <div className="proyecto-gradient" />

                            {/* Contenido */}
                            <div className="proyecto-content">
                                <div className="proyecto-icon">{p.icon}</div>
                                <h3 className="proyecto-nombre">{p.nombre}</h3>
                                <p className="proyecto-descripcion">{p.descripcion}</p>
                                <button
                                    className="proyecto-btn"
                                    onClick={() => setModal(p.imagenModal)}
                                >
                                    Ver proyectos →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modal && (
                <div className="modal" onClick={() => setModal(null)}>
                    <div className="modal-contenido" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setModal(null)}>✕</button>
                        <img src={modal} alt="Vista previa" />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Proyectos;