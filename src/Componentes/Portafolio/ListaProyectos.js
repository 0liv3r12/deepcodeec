import React from 'react';
import LinkTransicion from '../LinkTransicion';
import MarcoPhone from '../marcoPhone';
import MarcoDesktop from '../marcoDesktop';

/* Mismo nombre en el home y en la página del proyecto: el marco "viaja" entre páginas */
export const nombreTransicion = (entornoId, proyectoId) => `marco-${entornoId}-${proyectoId}`;

/* Caso grande: mockup en el marco del dispositivo + Problema → Solución → Resultado.
   Problema y resultado solo aparecen cuando están escritos en proyectosData.js. */
const CasoProyecto = ({ entorno, proyecto, invertido }) => {
    const Marco = entorno.dispositivo === 'computer' ? MarcoDesktop : MarcoPhone;
    const imagen = proyecto.captura || proyecto.galeria[0]?.src;
    const pasos = [
        ['Problema', proyecto.problema],
        ['Solución', proyecto.descripcion],
        ['Resultado', proyecto.resultado],
    ].filter(([, texto]) => texto);

    return (
        <article
            className={`caso ${invertido ? 'caso--invertido' : ''}`}
            style={{ '--acc-from': proyecto.color.from, '--acc-to': proyecto.color.to }}
        >
            <div className="caso-media" data-tilt>
                {/* La barra del monitor muestra el proyecto, no el dominio de DeepCodeEc */}
                <Marco url={proyecto.nombre} style={{ viewTransitionName: nombreTransicion(entorno.id, proyecto.id) }}>
                    <img
                        src={imagen}
                        alt={`Pantalla de ${proyecto.nombre}`}
                        loading="lazy"
                        decoding="async"
                    />
                </Marco>
            </div>

            <div className="caso-texto">
                <span className="caso-entorno">{entorno.nombre} · {proyecto.nombre}</span>
                <h3 className="caso-titular">{proyecto.titular}</h3>

                <dl className="caso-pasos">
                    {pasos.map(([etiqueta, texto]) => (
                        <div key={etiqueta} className="caso-paso">
                            <dt>{etiqueta}</dt>
                            <dd>{texto}</dd>
                        </div>
                    ))}
                </dl>

                <ul className="caso-stack" aria-label={`Tecnologías de ${proyecto.nombre}`}>
                    {proyecto.stack.map((t) => <li key={t}>{t}</li>)}
                </ul>

                <LinkTransicion className="caso-cta" to={`/proyecto/${entorno.id}/${proyecto.id}`}>
                    Ver caso <span className="btn-arrow" aria-hidden="true">→</span>
                    <span className="sr-only"> de {proyecto.nombre}</span>
                </LinkTransicion>
            </div>
        </article>
    );
};

/* Lista de casos, uno por fila alternando el lado del mockup. */
const ListaProyectos = ({ casos }) => (
    <div className="casos">
        {casos.map(({ entorno, proyecto }, i) => (
            <CasoProyecto
                key={`${entorno.id}-${proyecto.id}`}
                entorno={entorno}
                proyecto={proyecto}
                invertido={i % 2 === 1}
            />
        ))}
    </div>
);

export default ListaProyectos;
