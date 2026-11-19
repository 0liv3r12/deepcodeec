import React, { useEffect, useRef } from 'react';
import '../Estilos/proceso.css';

const pasos = [
    {
        titulo: 'Entender el negocio',
        texto: 'Antes de escribir una línea de código, conozco cómo trabajas, qué te quita tiempo y qué necesitas lograr.',
    },
    {
        titulo: 'Diseñar y validar',
        texto: 'Diseño las pantallas y las reviso contigo antes de construir, para que no haya sorpresas.',
    },
    {
        titulo: 'Construir con buenas prácticas',
        texto: 'Desarrollo con código limpio, seguro y escalable, con avances que puedes ver en el camino.',
    },
    {
        titulo: 'Entregar y acompañar',
        texto: 'Publico el sistema en producción y te acompaño mientras tu negocio crece.',
    },
];

/* Línea de tiempo: la línea azul se dibuja con el scroll y cada paso se "enciende".
   Con `animation-timeline: view()` lo hace solo el CSS. Si el navegador no lo
   soporta, un IntersectionObserver marca los pasos que pasaron el 60% de la
   pantalla y la línea avanza hasta el último encendido. */
const Proceso = () => {
    const listaRef = useRef(null);

    useEffect(() => {
        if (window.CSS?.supports?.('animation-timeline: view()')) return undefined;
        const lista = listaRef.current;
        const items = [...lista.querySelectorAll('.proceso-paso')];

        const actualizar = () => {
            const limite = window.innerHeight * 0.6;
            let encendidos = 0;
            items.forEach((el) => {
                const activo = el.getBoundingClientRect().top < limite;
                el.classList.toggle('is-activo', activo);
                if (activo) encendidos += 1;
            });
            lista.style.setProperty('--progreso', encendidos / items.length);
        };

        const io = new IntersectionObserver(actualizar, { rootMargin: '0px 0px -40% 0px' });
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section id="proceso">
            <div className="proceso-header">
                <span className="section-label" data-reveal>Proceso</span>
                <h2 className="section-title" data-reveal>
                    Cómo trabajo, <span className="gradient-text">de la idea a producción.</span>
                </h2>
                <p className="section-subtitle" data-reveal>
                    Cuatro pasos claros para que siempre sepas en qué va tu proyecto.
                </p>
            </div>

            <div className="proceso-cuerpo" ref={listaRef}>
                <span className="proceso-riel" aria-hidden="true" />
                <span className="proceso-progreso" aria-hidden="true" />
                <ol className="proceso-linea">
                    {pasos.map((p, i) => (
                        <li key={p.titulo} className="proceso-paso">
                            <span className="proceso-punto" aria-hidden="true" />
                            <span className="proceso-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                            <h3>{p.titulo}</h3>
                            <p>{p.texto}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Proceso;
