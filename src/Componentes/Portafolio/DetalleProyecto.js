import React from 'react';

const DetalleProyecto = ({ entorno, proyecto }) => {
    const { titular, nombre, descripcion, problema, resultado, tags = [], features = [], stack = [] } = proyecto;
    // Problema y resultado aparecen solo cuando están escritos en proyectosData.js
    const pasos = [['Problema', problema], ['Resultado', resultado]].filter(([, texto]) => texto);

    return (
        <div className="pl-copy">
            <span className="pl-eyebrow">{entorno.nombre} · {nombre}</span>
            <h1>{titular || nombre}</h1>
            <p>{descripcion}</p>

            {pasos.length > 0 && (
                <dl className="pl-pasos">
                    {pasos.map(([etiqueta, texto]) => (
                        <div key={etiqueta}>
                            <dt>{etiqueta}</dt>
                            <dd>{texto}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <div className="pl-tags">
                {tags.map(t => <span key={t} className="pl-tag">{t}</span>)}
            </div>

            {features.length > 0 && (
                <ul className="pl-features">
                    {features.map((f) => <li key={f}>{f}</li>)}
                </ul>
            )}

            {stack.length > 0 && (
                <div className="pl-stack">
                    <h2>Stack tecnológico</h2>
                    <ul className="pl-stack-items">
                        {stack.map(s => <li key={s} className="pl-stack-chip">{s}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DetalleProyecto;
