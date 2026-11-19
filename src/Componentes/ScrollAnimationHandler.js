import { useEffect } from 'react';

/* Animaciones globales de la web, montado una sola vez en App:
   - Reveal: cada elemento con `data-reveal` aparece al entrar en pantalla,
     escalonado con --reveal-delay si entran varios a la vez.
   - Spotlight y tilt: un solo listener delegado del puntero (solo mouse/trackpad)
     para `data-spotlight` (luz que sigue al cursor) y `data-tilt` (inclinación 3D). */

const PENDIENTE = '[data-reveal]:not(.is-visible)';
const PASO_MS = 80;
const MAX_RETRASO_MS = 400;
const TILT_MAX_GRADOS = 8;
const CONTAR_MS = 1200;

/* Números que cuentan hacia arriba al aparecer (`data-contar="8"`). El HTML ya
   trae el valor final (sin JS o con reduced-motion se ve tal cual). */
const contar = (el) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const final = Number(el.dataset.contar);
    const inicio = performance.now();
    const paso = (ahora) => {
        const t = Math.min((ahora - inicio) / CONTAR_MS, 1);
        el.textContent = Math.round(final * (1 - Math.pow(2, -10 * t))); // easeOutExpo
        if (t < 1) requestAnimationFrame(paso);
        else el.textContent = final;
    };
    requestAnimationFrame(paso);
};

const ScrollAnimationHandler = () => {
    useEffect(() => {
        // ── Reveal ──
        const io = new IntersectionObserver((entries) => {
            let orden = 0;
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.style.setProperty('--reveal-delay', `${Math.min(orden++ * PASO_MS, MAX_RETRASO_MS)}ms`);
                el.classList.add('is-visible');
                el.querySelectorAll('[data-contar]').forEach(contar);
                io.unobserve(el);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

        const observar = (raiz) => {
            if (raiz.matches(PENDIENTE)) io.observe(raiz);
            raiz.querySelectorAll(PENDIENTE).forEach((el) => io.observe(el));
        };
        observar(document.body);

        // Contenido que aparece después (cambio de ruta, filtros, listas nuevas)
        const mo = new MutationObserver((cambios) => cambios.forEach((c) =>
            c.addedNodes.forEach((n) => n.nodeType === 1 && observar(n))
        ));
        mo.observe(document.body, { childList: true, subtree: true });

        // ── Spotlight + tilt ──
        const punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)');
        const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
        let actual = null;
        let ultimoEvento = null;
        let frame = 0;

        const soltar = () => {
            if (!actual) return;
            actual.style.removeProperty('--rx');
            actual.style.removeProperty('--ry');
            actual = null;
        };

        const pintar = () => {
            frame = 0;
            const tarjeta = ultimoEvento.target.closest?.('[data-spotlight], [data-tilt]') || null;
            if (tarjeta !== actual) soltar();
            if (!tarjeta) return;
            actual = tarjeta;

            const r = tarjeta.getBoundingClientRect();
            const x = ultimoEvento.clientX - r.left;
            const y = ultimoEvento.clientY - r.top;
            tarjeta.style.setProperty('--mx', `${x}px`);
            tarjeta.style.setProperty('--my', `${y}px`);

            if (tarjeta.hasAttribute('data-tilt') && !sinMovimiento.matches) {
                tarjeta.style.setProperty('--ry', `${(x / r.width - 0.5) * 2 * TILT_MAX_GRADOS}deg`);
                tarjeta.style.setProperty('--rx', `${(0.5 - y / r.height) * 2 * TILT_MAX_GRADOS}deg`);
            }
        };

        const mover = (e) => {
            if (!punteroFino.matches) return;
            ultimoEvento = e;
            if (!frame) frame = requestAnimationFrame(pintar);
        };

        document.addEventListener('pointermove', mover, { passive: true });
        document.documentElement.addEventListener('pointerleave', soltar);

        return () => {
            io.disconnect();
            mo.disconnect();
            cancelAnimationFrame(frame);
            document.removeEventListener('pointermove', mover);
            document.documentElement.removeEventListener('pointerleave', soltar);
        };
    }, []);

    return null;
};

export default ScrollAnimationHandler;
