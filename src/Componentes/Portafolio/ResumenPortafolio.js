import React from 'react';
import IconoEntorno from './iconosEntorno';

const proceso = [
    'Empezamos por entender el negocio, no por escribir código.',
    'Diseñamos la interfaz y la validamos antes de construir.',
    'Desarrollamos con buenas prácticas: código limpio y escalable.',
    'Entregamos en producción y acompañamos el crecimiento.',
];

const etiquetaCantidad = (n) => (n === 0 ? 'Próximamente' : n === 1 ? 'proyecto' : 'proyectos');

const ResumenPortafolio = ({ entornos }) => (
    <div className="ph-right">
        <div className="ph-proceso">
            <h3>Cómo trabajamos</h3>
            <ul>
                {proceso.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
        </div>

        <div className="ph-nums">
            {entornos.map(e => (
                <div key={e.id} className={`ph-num ${e.lista.length === 0 ? 'vacio' : ''}`}>
                    <div className="ph-num-head">
                        <IconoEntorno id={e.id} sm />
                        {e.nombre}
                    </div>
                    <div className="ph-num-count">{String(e.lista.length).padStart(2, '0')}</div>
                    <div className="ph-num-label">{etiquetaCantidad(e.lista.length)}</div>
                </div>
            ))}
        </div>
    </div>
);

export default ResumenPortafolio;
