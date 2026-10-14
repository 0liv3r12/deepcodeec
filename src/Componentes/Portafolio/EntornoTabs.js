import React from 'react';
import IconoEntorno from './iconosEntorno';

const EntornoTabs = ({ entornos, activo, onCambiar }) => (
    <div className="ph-entorno-tabs">
        {entornos.map(e => (
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
