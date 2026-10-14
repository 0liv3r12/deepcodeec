import React from 'react';

const ProyectoCard = ({ entornoId, proyecto }) => {
    const portada = proyecto.portada || proyecto.galeria[1]?.src || proyecto.galeria[0]?.src;
    return (
        <a
            className="ph-proyecto"
            href={`/proyecto/${entornoId}/${proyecto.id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="ph-proyecto-media">
                <img src={portada} alt={proyecto.nombre} loading="lazy" />
            </div>
            <div className="ph-proyecto-info">
                <h5>{proyecto.nombre}</h5>
                <span className="ph-proyecto-cta">Ver proyecto ↗</span>
            </div>
        </a>
    );
};

const ListaProyectos = ({ entorno }) => (
    <div className="ph-proyectos">
        {entorno.lista.length === 0 ? (
            <div className="ph-proyectos-vacio">
                Todavía no hay proyectos en {entorno.nombre}.
                <span>Próximamente</span>
            </div>
        ) : (
            entorno.lista.map(p => <ProyectoCard key={p.id} entornoId={entorno.id} proyecto={p} />)
        )}
    </div>
);

export default ListaProyectos;
