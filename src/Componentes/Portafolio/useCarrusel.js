import { useState, useEffect } from 'react';

/* Avanza el índice automáticamente cada `intervalo` ms (si hay más de un item). */
const useCarrusel = (total, intervalo = 2600) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (total <= 1) return;
        const t = setInterval(() => setIndex(i => (i + 1) % total), intervalo);
        return () => clearInterval(t);
    }, [total, intervalo]);

    return index;
};

export default useCarrusel;
