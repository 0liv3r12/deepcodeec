import React from 'react';
import Oliver from "../Imagenes/Oliver.png";
import '../Estilos/nosotros.css';

const Nosotros = () => {
    return (
        <section id="nosotros" className="animate-on-scroll">
            <div className="nosotros-inner">

                {/* ── Columna izquierda ── */}
                <div className="nosotros-content">
                    <span className="section-label">Nosotros</span>
                    <h2 className="section-title">
                        ¿Por qué elegir <span className="gradient-text">DeepCode?</span>
                    </h2>

                    <p className="nosotros-intro">
                        En DeepCode construimos soluciones digitales que van más allá del diseño bonito.
                        Cada proyecto empieza por entender tu negocio: qué necesitas, cómo creces,
                        y qué problemas reales tienes que resolver. El resultado es software funcional,
                        bien estructurado y pensado para durar.
                    </p>

                    <div className="nosotros-stats">
                        <div className="stat">
                            <span className="stat-number">4+</span>
                            <span className="stat-label">Tecnologías</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">Web·Móvil·Desktop</span>
                            <span className="stat-label">Plataformas</span>
                        </div>
                    </div>

                    <div className="nosotros-cards">
                        <div className="carta">
                            <h3>Visión</h3>
                            <p>
                                Ser el estudio de desarrollo de referencia en el sur del Ecuador,
                                reconocido por entregar software que realmente resuelve problemas
                                y acompaña el crecimiento de cada cliente.
                            </p>
                        </div>
                        <div className="carta">
                            <h3>Misión</h3>
                            <p>
                                Construir soluciones digitales claras, escalables y bien estructuradas,
                                aplicando buenas prácticas de ingeniería en cada etapa del proyecto.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Columna derecha ── */}
                <div className="nosotros-team">
                    <span className="team-label">Equipo</span>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={Oliver} alt="Oliver Torres" />
                            </div>
                            <div className="flip-card-back">
                                <h2>Oliver Torres</h2>
                                <p className="role">Fundador · Full Stack Developer</p>
                                <p>
                                    Desarrollador full stack enfocado en construir productos digitales
                                    funcionales y escalables. Trabajo con tecnologías modernas en
                                    cada capa del proyecto — desde la interfaz hasta el servidor.
                                    <br /><br />
                                    <strong style={{ color: 'var(--text-primary)' }}>Stack principal:</strong><br />
                                    • Web: React, HTML5, CSS3, JavaScript<br />
                                    • Móvil: Flutter, React Native<br />
                                    • Backend: Node.js, Express, Prisma<br />
                                    • DB: PostgreSQL, MySQL, Firebase
                                </p>
                            </div>
                        </div>
                    </div>

                    <span className="flip-hint">↕ Pasa el cursor para ver el perfil</span>
                </div>

            </div>
        </section>
    );
};

export default Nosotros;