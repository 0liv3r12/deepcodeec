import React from 'react';
import IconoEntorno from './iconosEntorno';

/* Contadores por entorno. Apagados con MOSTRAR_CONTADORES en proyectos.js:
   activarlos cuando haya 5 o más proyectos (con pocos, el "00" resta). */
const etiquetaCantidad = (n) => (n === 0 ? 'Próximamente' : n === 1 ? 'proyecto' : 'proyectos');

const ResumenPortafolio = ({ entornos }) => (
    <div className="ph-nums">
        {entornos.map(e => (
            <div key={e.id} className={`ph-num ${e.lista.length === 0 ? 'vacio' : ''}`} data-spotlight>
                <div className="ph-num-head">
                    <IconoEntorno id={e.id} sm />
                    {e.nombre}
                </div>
                <div className="ph-num-count">{String(e.lista.length).padStart(2, '0')}</div>
                <div className="ph-num-label">{etiquetaCantidad(e.lista.length)}</div>
            </div>
        ))}
    </div>
);

export default ResumenPortafolio;
