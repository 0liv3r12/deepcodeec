import React from 'react';
import { whatsapp } from '../Data/contacto';
import '../Estilos/servicios.css';

/* Íconos de línea dentro de los corchetes de marca < >. Todos con el mismo
   trazo; `pathLength="1"` permite "dibujarlos" con stroke-dashoffset al hover. */
const trazo = { pathLength: 1, className: 'icono-trazo' };

const figuras = {
    movil: (
        <>
            <rect x="23" y="6" width="18" height="28" rx="3.5" {...trazo} />
            <path d="M29 29.5h6" {...trazo} />
        </>
    ),
    web: (
        <>
            <rect x="17" y="8" width="30" height="24" rx="3" {...trazo} />
            <path d="M17 14h30" {...trazo} />
            <path d="M22 20h12M22 25h8" {...trazo} />
        </>
    ),
    escritorio: (
        <>
            <rect x="18" y="7" width="28" height="19" rx="2.5" {...trazo} />
            <path d="M32 26v5M26 32.5h12" {...trazo} />
        </>
    ),
    bd: (
        <>
            <ellipse cx="32" cy="10.5" rx="10" ry="3.5" {...trazo} />
            <path d="M22 10.5v19c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-19" {...trazo} />
            <path d="M22 20c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5" {...trazo} />
        </>
    ),
};

const IconoServicio = ({ id }) => (
    <svg className="servicio-icono" viewBox="0 0 64 40" fill="none" aria-hidden="true">
        <path d="M12 9 4 20l8 11" className="icono-corchete" {...trazo} />
        <path d="M52 9l8 11-8 11" className="icono-corchete" {...trazo} />
        {figuras[id]}
    </svg>
);

const servicios = [
    {
        id: 'movil',
        title: 'App Móvil',
        beneficio: 'Tu negocio en el bolsillo de tus clientes.',
        features: [
            'Notificaciones en tiempo real',
            'GPS, cámara y pagos integrados',
            'Funciona sin conexión',
            'Publicación en Play Store y App Store',
        ],
        stack: ['Flutter', 'React Native'],
        mensaje: 'Hola DeepCodeEc, quiero cotizar una app móvil.',
    },
    {
        id: 'web',
        title: 'Sitio Web',
        beneficio: 'Tus clientes reservan y pagan solos.',
        features: [
            'Se adapta a celular, tablet y PC',
            'SEO técnico desde la base',
            'Formularios, chat y páginas de pago',
            'Fácil de actualizar sin tocar código',
        ],
        stack: ['React', 'Node.js'],
        mensaje: 'Hola DeepCodeEc, quiero cotizar un sitio web.',
    },
    {
        id: 'escritorio',
        title: 'Software de Escritorio',
        beneficio: 'Tu operación interna bajo control, aunque se caiga el internet.',
        features: [
            'Inventario y control de stock',
            'Facturación y reportes automáticos',
            'Usuarios y permisos',
            'Conexión con impresoras y dispositivos',
        ],
        stack: ['Electron', 'JavaScript', 'MySQL'],
        mensaje: 'Hola DeepCodeEc, quiero cotizar un software de escritorio.',
    },
    {
        id: 'bd',
        title: 'Base de Datos',
        beneficio: 'Tu información ordenada y lista para crecer.',
        features: [
            'Estructura pensada para escalar',
            'Respaldos automáticos',
            'Consultas rápidas aunque el volumen crezca',
            'Acceso controlado por rol',
        ],
        stack: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
        mensaje: 'Hola DeepCodeEc, quiero cotizar una base de datos.',
    },
];

const Servicios = () => (
    <section id="entornos">
        <div className="entornos-header">
            <span className="section-label" data-reveal>Servicios</span>
            <h2 className="section-title" data-reveal>
                Una solución para cada parte <span className="gradient-text">de tu negocio.</span>
            </h2>
            <p className="section-subtitle" data-reveal>
                Web, móvil, escritorio o datos: lo construyo de la idea a producción
                para que trabaje por ti.
            </p>
        </div>

        <div className="servicios-grid">
            {servicios.map((s) => (
                <article key={s.id} className="servicio-card" data-reveal data-spotlight data-tilt>
                    <IconoServicio id={s.id} />
                    <h3 className="servicio-titulo">{s.title}</h3>
                    <p className="servicio-beneficio">{s.beneficio}</p>

                    <ul className="servicio-features">
                        {s.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>

                    <ul className="servicio-stack" aria-label={`Tecnologías para ${s.title}`}>
                        {s.stack.map((t) => <li key={t}>{t}</li>)}
                    </ul>

                    {/* Pie fijo: la línea y "Cotizar" quedan a la misma altura en todas las tarjetas */}
                    <div className="servicio-pie">
                        <a
                            className="servicio-cta"
                            href={whatsapp(s.mensaje)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Cotizar ${s.title} por WhatsApp`}
                        >
                            Cotizar <span className="btn-arrow" aria-hidden="true">→</span>
                        </a>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

export default Servicios;
