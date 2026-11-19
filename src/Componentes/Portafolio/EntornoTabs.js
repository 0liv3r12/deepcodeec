import React from 'react';
import IconoEntorno from './iconosEntorno';

/* Filtros del portafolio. `opciones`: [{ id, nombre }], incluye "Todos". */
const EntornoTabs = ({ opciones, activo, onCambiar }) => (
    <div className="ph-entorno-tabs" role="group" aria-label="Filtrar proyectos por tipo">
        {opciones.map(e => (
            <button
                key={e.id}
                type="button"
                className={`ph-entorno-tab ${activo === e.id ? 'active' : ''}`}
                aria-pressed={activo === e.id}
                onClick={() => onCambiar(e.id)}
            >
                <IconoEntorno id={e.id} />
                {e.nombre}
            </button>
        ))}
    </div>
);

export default EntornoTabs;
