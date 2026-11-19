import React from 'react';

/* ── Iconos propios (line icons, sin emoji) ── */
const IconWeb = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4.5" width="18" height="14" rx="2" /><path d="M3 8.5h18" />
    </svg>
);
const IconMovil = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    </svg>
);
const IconEscritorio = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="12" rx="1.6" /><path d="M9 20h6M12 16v4" />
    </svg>
);
const IconBD = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
        <path d="M5 5.5V18.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.5" />
        <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
);

const IconTodos = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
);

const iconos = { todos: IconTodos, web: IconWeb, movil: IconMovil, escritorio: IconEscritorio, bd: IconBD };

/* Icono del entorno; `sm` para la versión pequeña de las tarjetas de número. */
const IconoEntorno = ({ id, sm = false }) => {
    const Icon = iconos[id];
    return (
        <span className={`ph-tab-icon ${sm ? 'sm' : ''}`}>
            {Icon && <Icon />}
        </span>
    );
};

export default IconoEntorno;
