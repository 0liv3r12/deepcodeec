import React, { useState } from 'react';
import { entornosConProyectos as entornos } from '../Data/proyectosData';
import EntornoTabs from '../Componentes/Portafolio/EntornoTabs';
import ListaProyectos from '../Componentes/Portafolio/ListaProyectos';
import ResumenPortafolio from '../Componentes/Portafolio/ResumenPortafolio';
import '../Estilos/proyectos.css';

const Proyectos = () => {
    const [entornoActivo, setEntornoActivo] = useState(
        entornos.find(e => e.lista.length > 0)?.id || entornos[0].id
    );
    const entorno = entornos.find(e => e.id === entornoActivo);

    return (
        <section id="proyectos">
            <div className="proyectos-header">
                <span className="section-label">Portafolio</span>
                <h2 className="section-title">
                    Software construido <span className="gradient-text">para negocios reales.</span>
                </h2>
                <p className="section-subtitle">
                    Aplicaciones web, móviles y de escritorio desarrolladas de punta a punta.
                </p>
            </div>

            <div className="showcase-wrapper">
                <div className="ph-hero">
                    <div className="ph-left">
                        <EntornoTabs entornos={entornos} activo={entornoActivo} onCambiar={setEntornoActivo} />
                        {/* key: reinicia la animación de entrada al cambiar de entorno */}
                        <ListaProyectos key={entornoActivo} entorno={entorno} />
                    </div>
                    <ResumenPortafolio entornos={entornos} />
                </div>
            </div>
        </section>
    );
};

export default Proyectos;
