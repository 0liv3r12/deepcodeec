import React from 'react';

const HeroVisual = () => (
    <svg
        viewBox="0 0 500 380"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 500, height: 'auto', display: 'block' }}
        aria-label="Dashboard de aplicación DeepCode"
    >
        <defs>
            <linearGradient id="hv-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#13132a" />
                <stop offset="100%" stopColor="#0a0a18" />
            </linearGradient>
            <linearGradient id="hv-accent" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38B6FF" />
                <stop offset="100%" stopColor="#7B2FFF" />
            </linearGradient>
            <linearGradient id="hv-bar1" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="hv-bar2" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7B2FFF" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38B6FF" stopOpacity="0" />
                <stop offset="30%" stopColor="#38B6FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#7B2FFF" stopOpacity="1" />
            </linearGradient>
            <filter id="hv-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="hv-softglow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
        </defs>

        {/* ── Fondo principal ── */}
        <rect x="0" y="0" width="500" height="380" rx="20"
            fill="url(#hv-bg)"
            stroke="rgba(56,182,255,0.18)" strokeWidth="1" />

        {/* ── Barra de título ── */}
        <rect x="0" y="0" width="500" height="44" rx="20" fill="#0d0d1f" />
        <rect x="0" y="24" width="500" height="20" fill="#0d0d1f" />

        {/* Traffic lights */}
        <circle cx="26" cy="22" r="5" fill="#ff5f57" opacity="0.9" />
        <circle cx="44" cy="22" r="5" fill="#febc2e" opacity="0.9" />
        <circle cx="62" cy="22" r="5" fill="#28c840" opacity="0.9" />

        {/* Tabs */}
        <rect x="90" y="12" width="90" height="20" rx="5" fill="rgba(56,182,255,0.12)" />
        <text x="135" y="26" textAnchor="middle" fill="#38B6FF"
            fontSize="9" fontFamily="monospace" fontWeight="600">dashboard.jsx</text>
        <rect x="188" y="16" width="70" height="12" rx="3" fill="rgba(255,255,255,0.04)" />
        <text x="223" y="26" textAnchor="middle" fill="#4A5568"
            fontSize="9" fontFamily="monospace">api.js</text>

        {/* ── Área de contenido ── */}

        {/* --- Stat cards fila top --- */}
        {[
            { x: 20, label: 'Usuarios', val: '2.4k', color: '#38B6FF', w: 55 },
            { x: 183, label: 'Ingresos', val: '$8.1k', color: '#7B2FFF', w: 48 },
            { x: 346, label: 'Uptime', val: '99.9%', color: '#38B6FF', w: 44 },
        ].map((c, i) => (
            <g key={i}>
                <rect x={c.x} y="62" width="143" height="72" rx="12"
                    fill="#141428" stroke="rgba(56,182,255,0.1)" strokeWidth="1" />
                {/* Label */}
                <text x={c.x + 16} y="83" fill="#4A5568"
                    fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500"
                    letterSpacing="0.05em">{c.label.toUpperCase()}</text>
                {/* Valor */}
                <text x={c.x + 16} y="103" fill={c.color}
                    fontSize="22" fontFamily="'Space Grotesk',sans-serif" fontWeight="700"
                    filter="url(#hv-softglow)">{c.val}</text>
                {/* Trend badge */}
                <rect x={c.x + 16} y="114" width={c.w} height="12" rx="6"
                    fill={`${c.color}22`} />
                <text x={c.x + 16 + c.w / 2} y="123" textAnchor="middle"
                    fill={c.color} fontSize="7.5" fontFamily="monospace" fontWeight="600">
                    ↑ {i === 0 ? '+12%' : i === 1 ? '+8.3%' : '30d'}
                </text>
            </g>
        ))}

        {/* --- Gráfico barras --- */}
        <rect x="20" y="148" width="308" height="170" rx="12"
            fill="#141428" stroke="rgba(56,182,255,0.08)" strokeWidth="1" />
        <text x="36" y="168" fill="#8A9BB0"
            fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500"
            letterSpacing="0.06em">ACTIVIDAD MENSUAL</text>

        {/* Líneas de guía horizontales */}
        {[0, 1, 2, 3].map(i => (
            <line key={i}
                x1="36" y1={290 - i * 38} x2="312" y2={290 - i * 38}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Barras */}
        {[
            { h: 52, c: 'url(#hv-bar1)' },
            { h: 80, c: 'url(#hv-bar1)' },
            { h: 38, c: 'url(#hv-bar2)' },
            { h: 95, c: 'url(#hv-bar1)' },
            { h: 62, c: 'url(#hv-bar2)' },
            { h: 110, c: 'url(#hv-bar1)' },
            { h: 70, c: 'url(#hv-bar2)' },
            { h: 88, c: 'url(#hv-bar1)' },
            { h: 45, c: 'url(#hv-bar2)' },
            { h: 102, c: 'url(#hv-bar1)' },
        ].map((b, i) => (
            <g key={i}>
                <rect x={44 + i * 27} y={290 - b.h} width="14" height={b.h} rx="4"
                    fill={b.c}>
                    <animate attributeName="height" from="0" to={b.h}
                        dur="0.5s" begin={`${i * 0.07}s`} fill="freeze" />
                    <animate attributeName="y" from="290" to={290 - b.h}
                        dur="0.5s" begin={`${i * 0.07}s`} fill="freeze" />
                </rect>
                {/* Mes abreviado */}
                <text x={44 + i * 27 + 7} y="305" textAnchor="middle"
                    fill="#4A5568" fontSize="7" fontFamily="monospace">
                    {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O'][i]}
                </text>
            </g>
        ))}

        {/* Línea de tendencia sobre barras */}
        <polyline
            points="51,238 78,210 105,252 132,195 159,228 186,180 213,220 240,202 267,245 294,188"
            fill="none" stroke="url(#hv-line)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#hv-glow)" opacity="0.7" />

        {/* Punto de highlight en el pico */}
        <circle cx="186" cy="180" r="4" fill="#38B6FF" filter="url(#hv-glow)" />
        <circle cx="186" cy="180" r="7" fill="rgba(56,182,255,0.2)" />

        {/* --- Panel derecho --- */}
        <rect x="344" y="148" width="136" height="82" rx="12"
            fill="#141428" stroke="rgba(56,182,255,0.08)" strokeWidth="1" />
        <text x="360" y="168" fill="#8A9BB0"
            fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500"
            letterSpacing="0.06em">PROGRESO</text>

        {/* Donut chart */}
        <circle cx="392" cy="207" r="26" fill="none"
            stroke="rgba(56,182,255,0.1)" strokeWidth="6" />
        <circle cx="392" cy="207" r="26" fill="none"
            stroke="url(#hv-accent)" strokeWidth="6"
            strokeDasharray="120 43" strokeLinecap="round"
            transform="rotate(-90 392 207)"
            filter="url(#hv-glow)" />
        <text x="392" y="211" textAnchor="middle" fill="#E8F4FD"
            fontSize="10" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">75%</text>

        {/* Mini leyenda */}
        <circle cx="438" cy="196" r="4" fill="#38B6FF" />
        <text x="446" y="199" fill="#8A9BB0" fontSize="7.5" fontFamily="monospace">Web</text>
        <circle cx="438" cy="212" r="4" fill="#7B2FFF" />
        <text x="446" y="215" fill="#8A9BB0" fontSize="7.5" fontFamily="monospace">App</text>
        <circle cx="438" cy="228" r="4" fill="rgba(56,182,255,0.3)" />
        <text x="446" y="231" fill="#8A9BB0" fontSize="7.5" fontFamily="monospace">DB</text>

        {/* --- Panel actividad reciente --- */}
        <rect x="344" y="244" width="136" height="74" rx="12"
            fill="#141428" stroke="rgba(56,182,255,0.08)" strokeWidth="1" />
        <text x="360" y="262" fill="#8A9BB0"
            fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="500"
            letterSpacing="0.06em">RECIENTE</text>

        {[
            { label: 'Deploy prod', color: '#28c840', ago: '2m' },
            { label: 'New build', color: '#38B6FF', ago: '14m' },
            { label: 'Tests ✓', color: '#7B2FFF', ago: '1h' },
        ].map((item, i) => (
            <g key={i}>
                <circle cx="360" cy={275 + i * 15} r="3.5" fill={item.color}
                    opacity="0.9" filter="url(#hv-glow)" />
                <text x="370" y={279 + i * 15} fill="#8A9BB0"
                    fontSize="7.5" fontFamily="monospace">{item.label}</text>
                <text x="462" y={279 + i * 15} textAnchor="end" fill="#4A5568"
                    fontSize="7" fontFamily="monospace">{item.ago}</text>
            </g>
        ))}

        {/* --- Stack tags fila inferior --- */}
        <rect x="20" y="330" width="460" height="36" rx="10"
            fill="#141428" stroke="rgba(56,182,255,0.07)" strokeWidth="1" />

        {[
            { label: 'React', color: '#38B6FF', bg: 'rgba(56,182,255,0.15)' },
            { label: 'Flutter', color: '#7B2FFF', bg: 'rgba(123,47,255,0.15)' },
            { label: 'Node.js', color: '#38B6FF', bg: 'rgba(56,182,255,0.1)' },
            { label: 'PostgreSQL', color: '#7B2FFF', bg: 'rgba(123,47,255,0.12)' },
            { label: 'Firebase', color: '#38B6FF', bg: 'rgba(56,182,255,0.08)' },
        ].map((t, i) => {
            const widths = [44, 48, 48, 68, 52];
            const offsets = [30, 90, 154, 218, 302];
            return (
                <g key={i}>
                    <rect x={offsets[i]} y="339" width={widths[i]} height="18" rx="9"
                        fill={t.bg} stroke={`${t.color}44`} strokeWidth="1" />
                    <text x={offsets[i] + widths[i] / 2} y="351" textAnchor="middle"
                        fill={t.color} fontSize="7.5" fontFamily="monospace"
                        fontWeight="600">{t.label}</text>
                </g>
            );
        })}

        {/* Cursor parpadeante */}
        <rect x="370" y="337" width="2" height="14" rx="1" fill="#38B6FF" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1.1s" repeatCount="indefinite" />
        </rect>

    </svg>
);

export default HeroVisual;