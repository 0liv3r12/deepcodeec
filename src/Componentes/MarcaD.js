import React, { useId } from 'react';

/* Símbolo de marca <D> de DeepCodeEc.
   Polígonos simplificados del trazo real de Logo.svg (coordenadas x, y planas
   en una caja de 1000 × 370). Los usa el SVG estático y la escena 3D del hero. */
export const MARCA_ANCHO = 1000;
export const MARCA_ALTO = 370;

export const PIEZAS_D = {
    corcheteIzq: [298.4, 368.8, 0, 184.8, 301, 0.3, 301.2, 61.6, 99.6, 184.9, 300.5, 306.3, 302, 364.5, 301.6, 369],
    d: [396.4, 351.5, 395.2, 349.6, 394.9, 333, 394.9, 232.9, 395.1, 223.7, 395.3, 220.9, 395.9, 219.9, 456.5, 219.9, 457.6, 222, 457.8, 226.2, 457.9, 290.7, 459.6, 292.1, 486.8, 291.4, 505.5, 288.5, 515.5, 286.1, 522.2, 283.8, 537.2, 277, 546, 271.2, 553.5, 264.8, 561.6, 255.8, 568.3, 245.5, 572.8, 236.2, 576, 227.3, 579.1, 213.4, 580.8, 200.3, 580.9, 182, 580.7, 175.5, 578.9, 163, 575.8, 149.8, 573, 141.9, 566.4, 128.3, 556.3, 115.8, 551.6, 111.1, 544, 104.9, 534.7, 98.9, 528.6, 95.9, 522.7, 93.3, 512.4, 89.9, 493.7, 85.9, 460.3, 84.6, 457.8, 86.3, 457.9, 150.9, 457.6, 155.3, 456.9, 156.7, 396.2, 157.1, 395.2, 154.9, 395.1, 147.3, 394.9, 40.7, 395.5, 26.2, 399.3, 23.9, 442.8, 24, 486.8, 25.1, 506.9, 27.4, 532.8, 32.7, 549.9, 38, 562.8, 43.1, 571.5, 47.3, 583.8, 54.6, 593.5, 61.7, 605.3, 72.8, 613.3, 81.8, 621.3, 93.4, 628.8, 107.4, 633.8, 119.3, 639.3, 138.7, 641.4, 148.7, 643.8, 168.2, 644.2, 181.5, 643.7, 207.8, 641.6, 225.5, 639.4, 236.8, 634.1, 254.9, 626.6, 272.4, 621.3, 281.5, 614.2, 291.8, 605.8, 301.8, 595.3, 311.5, 587.8, 317.5, 579.3, 323.3, 563.7, 331.6, 551, 337.3, 536.9, 342, 519.2, 346.5, 501.9, 349.6, 481.1, 351.8, 397.4, 352.3],
    corcheteDer: [697.4, 369.3, 696.9, 307.4, 900.6, 185.2, 697.4, 61.4, 698.1, 0, 1000, 184.9],
};

const aPath = (pts) => {
    let d = '';
    for (let i = 0; i < pts.length; i += 2) d += `${i ? 'L' : 'M'}${pts[i]} ${pts[i + 1]}`;
    return `${d}Z`;
};

const CORCHETES_PATH = aPath(PIEZAS_D.corcheteIzq) + aPath(PIEZAS_D.corcheteDer);
const LETRA_PATH = aPath(PIEZAS_D.d);

/* SVG del <D>. Decorativo por defecto; pasa `titulo` si debe leerse.
   `acabado`: la D en azul más profundo con borde azul hielo, igual que la escena 3D. */
const MarcaD = ({ className = '', titulo, acabado = false }) => {
    const id = `marca-d-${useId().replace(/[^\w-]/g, '')}`; // url(#…) seguro en todos los navegadores
    return (
        <svg
            className={className}
            viewBox={`0 0 ${MARCA_ANCHO} ${MARCA_ALTO}`}
            fill="currentColor"
            role={titulo ? 'img' : undefined}
            aria-label={titulo}
            aria-hidden={titulo ? undefined : 'true'}
        >
            {acabado && (
                <defs>
                    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="var(--brand-blue)" />
                        <stop offset="1" stopColor="var(--brand-deep)" />
                    </linearGradient>
                </defs>
            )}
            <path d={CORCHETES_PATH} />
            <path
                d={LETRA_PATH}
                fill={acabado ? `url(#${id})` : undefined}
                stroke={acabado ? 'var(--brand-ice)' : undefined}
                strokeWidth={acabado ? 5 : undefined}
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MarcaD;
