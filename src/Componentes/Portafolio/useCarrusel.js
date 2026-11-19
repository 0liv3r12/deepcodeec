import { useState, useEffect } from 'react';

/* Carrusel con avance automático que se puede pausar (WCAG 2.2.2).
   - Se pausa con el botón, mientras el mouse o el foco están en la galería,
     y con la pestaña oculta.
   - Con reduced-motion arranca pausado. */
const useCarrusel = (total, intervalo = 3200) => {
    const [index, setIndex] = useState(0);
    const [pausado, setPausado] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const [enFoco, setEnFoco] = useState(false);

    useEffect(() => {
        if (total <= 1 || pausado || enFoco) return undefined;
        const t = setInterval(() => {
            if (!document.hidden) setIndex((i) => (i + 1) % total);
        }, intervalo);
        return () => clearInterval(t);
    }, [total, intervalo, pausado, enFoco]);

    const ir = (i) => setIndex(((i % total) + total) % total);

    return { index, ir, pausado, setPausado, setEnFoco };
};

export default useCarrusel;
