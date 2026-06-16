import React from 'react';
import HeroVisual from '../Componentes/HeroVisual';
import '../Estilos/home.css';

const Home = () => {
    return (
        <section id="home">
            <div className="home-container">
                <div className="text-content">
                    <span className="hero-eyebrow">Software a medida · Loja, Ecuador</span>

                    <h1 className="hero-title">
                        Convertimos ideas en<br />
                        <span className="highlight">productos digitales</span><br />
                        que funcionan.
                    </h1>

                    <div className="hero-terminal">
                        <span className="terminal-prompt">&gt;</span>
                        <span className="terminal-text">build --prod --scalable --fast</span>
                    </div>

                    <p className="hero-description">
                        Desarrollamos aplicaciones web, móviles y de escritorio adaptadas a tu negocio.
                        Desde la primera pantalla hasta el servidor en producción.
                    </p>

                    <div className="hero-tags">
                        <span className="hero-tag">UI/UX</span>
                        <span className="hero-tag">Desarrollo Móvil</span>
                        <span className="hero-tag">Desarrollo Web</span>
                        <span className="hero-tag">Bases de Datos</span>
                        <span className="hero-tag">Escalabilidad</span>
                    </div>

                    <div className="hero-cta">
                        <a href="#entornos" className="btn-primary">Ver servicios →</a>
                        <a href="#nosotros" className="btn-secondary">Conocer el equipo</a>
                    </div>
                </div>

                <div className="image-content">
                    <div className="glow-orb glow-orb-1" />
                    <div className="glow-orb glow-orb-2" />
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
};

export default Home;