import React from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

/* Link con transición de página (View Transitions API). BrowserRouter no la
   aplica por sí solo: aquí la navegación se envuelve en startViewTransition y
   flushSync hace que React pinte la página nueva dentro de la transición.
   Sin soporte, con reduced-motion o con ctrl/cmd-clic navega normal. */
const LinkTransicion = ({ to, onClick, ...props }) => {
    const navigate = useNavigate();

    const alHacerClic = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        e.preventDefault();
        document.startViewTransition(() => flushSync(() => navigate(to)));
    };

    return <Link to={to} onClick={alHacerClic} {...props} />;
};

export default LinkTransicion;
