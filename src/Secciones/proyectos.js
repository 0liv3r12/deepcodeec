import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { entornosConProyectos as entornos } from '../Data/proyectosData';
import EntornoTabs from '../Componentes/Portafolio/EntornoTabs';
import ListaProyectos from '../Componentes/Portafolio/ListaProyectos';
import ResumenPortafolio from '../Componentes/Portafolio/ResumenPortafolio';
import '../Estilos/proyectos.css';

/* Activar cuando haya 5+ proyectos: con pocos, los contadores (y el "00") restan. */
const MOSTRAR_CONTADORES = false;

// Solo se filtra por entornos que ya tienen proyectos
const conProyectos = entornos.filter(e => e.lista.length > 0);
const opciones = [{ id: 'todos', nombre: 'Todos' }, ...conProyectos];

const casosDe = (filtro) =>
    conProyectos
        .filter(e => filtro === 'todos' || e.id === filtro)
        .flatMap(e => e.lista.map(proyecto => ({ entorno: e, proyecto })));

const Proyectos = () => {
    const [filtro, setFiltro] = useState('todos');

    // Transición animada entre listas: View Transitions si existe; si no, el
    // remontaje por `key` dispara la animación CSS de respaldo.
    const cambiarFiltro = (id) => {
        if (id === filtro) return;
        const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || sinMovimiento) {
            setFiltro(id);
            return;
        }
        document.startViewTransition(() => flushSync(() => setFiltro(id)));
    };

    return (
        <section id="proyectos">
            <div className="proyectos-header">
                <span className="section-label" data-reveal>Proyectos</span>
                <h2 className="section-title" data-reveal>
                    Software construido <span className="gradient-text">para negocios reales.</span>
                </h2>
                <p className="section-subtitle" data-reveal>
                    Aplicaciones web, móviles y de escritorio desarrolladas de punta a punta.
                </p>
            </div>

            <div className="showcase-wrapper" data-reveal>
                <EntornoTabs opciones={opciones} activo={filtro} onCambiar={cambiarFiltro} />
                <ListaProyectos key={filtro} casos={casosDe(filtro)} />
                {MOSTRAR_CONTADORES && <ResumenPortafolio entornos={entornos} />}
            </div>
        </section>
    );
};

export default Proyectos;
