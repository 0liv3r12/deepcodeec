import React from 'react';
import Oliver from '../Imagenes/Oliver.jpg';
import '../Estilos/nosotros.css';

/* TODO Oliver: los textos de esta sección son un borrador para que los corrijas. */
const datos = [
    { numero: 4, etiqueta: 'plataformas: web, móvil, escritorio y bases de datos' },
    { numero: 8, sufijo: ' años', etiqueta: 'en la industria de eventos: negocios reales, no solo código' },
    { numero: 1, etiqueta: 'persona responsable de tu proyecto, de la idea a producción' },
];

const Nosotros = () => (
    <section id="nosotros">
        <div className="nosotros-inner">

            {/* ── Foto: siempre visible, con borde azul animado ── */}
            <figure className="fundador" data-reveal>
                <div className="fundador-marco" data-tilt>
                    <img
                        src={Oliver}
                        alt="Oliver Torres, fundador de DeepCodeEc"
                        width="670"
                        height="844"
                        loading="lazy"
                        decoding="async"
                    />
                    <span className="fundador-etiqueta">Fundador</span>
                </div>
                <figcaption>
                    <strong>Oliver Torres</strong>
                    <span>Desarrollador full stack · Loja, Ecuador</span>
                </figcaption>
            </figure>

            {/* ── Historia, datos, visión y misión ── */}
            <div className="nosotros-content">
                <span className="section-label" data-reveal>Quién está detrás</span>
                <h2 className="section-title" data-reveal>
                    Una persona, <span className="gradient-text">de la idea a producción.</span>
                </h2>

                <div className="nosotros-historia" data-reveal>
                    <p>
                        Soy Oliver Torres, fundador de DeepCodeEc y desarrollador full stack:
                        diseño, programo y publico cada proyecto de principio a fin.
                    </p>
                    <p>
                        Soy Tecnólogo en Desarrollo de Software y pasé cerca de 8 años en la
                        industria de eventos.
                    </p>
                    <p>
                        Por eso entiendo cómo funciona un negocio real, no solo el código:
                        hablo tu idioma y pienso en tus clientes.
                    </p>
                </div>

                <dl className="nosotros-stats" data-reveal>
                    {datos.map((d) => (
                        <div key={d.etiqueta} className="stat">
                            <dt className="stat-label">{d.etiqueta}</dt>
                            <dd className="stat-number">
                                {/* El número visible cuenta hacia arriba; el lector oye el valor final */}
                                <span aria-hidden="true" data-contar={d.numero}>{d.numero}</span>
                                {d.sufijo && <span aria-hidden="true">{d.sufijo}</span>}
                                <span className="sr-only">{d.numero}{d.sufijo}</span>
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="nosotros-cards">
                    <div className="carta" data-reveal data-spotlight data-tilt>
                        <h3>Visión</h3>
                        <p>
                            Una idea nacida en Loja que lleva software bien hecho a negocios de
                            todo el Ecuador.
                        </p>
                    </div>
                    <div className="carta" data-reveal data-spotlight data-tilt>
                        <h3>Misión</h3>
                        <p>
                            Construir soluciones digitales claras, seguras y escalables, con buenas
                            prácticas en cada etapa, para que cada negocio trabaje mejor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Nosotros;
