import React from 'react';

const DetalleProyecto = ({ entorno, proyecto }) => {
    const { titular, nombre, descripcion, tags = [], features = [], stack = [] } = proyecto;

    return (
        <div className="pl-copy">
            <span className="pl-eyebrow">{entorno.nombre} · DeepCode</span>
            <h1>{titular || nombre}</h1>
            <p>{descripcion}</p>

            <div className="pl-tags">
                {tags.map(t => <span key={t} className="pl-tag">{t}</span>)}
            </div>

            {features.length > 0 && (
                <ul className="pl-features">
                    {features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
            )}

            {stack.length > 0 && (
                <div className="pl-stack">
                    <h4>Stack tecnológico</h4>
                    <div className="pl-stack-items">
                        {stack.map(s => <div key={s} className="pl-stack-chip">{s}</div>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetalleProyecto;
