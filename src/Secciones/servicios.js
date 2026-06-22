import React, { useState, useEffect } from 'react';
import web from '../Imagenes/img2.avif';
import movil from '../Imagenes/img3.avif';
import escritorio from '../Imagenes/img4.avif';
import basedatos from '../Imagenes/img5.avif';
import '../Estilos/servicios.css';

const servicios = [
    {
        id: 0,
        icon: '📱',
        title: 'App Móvil',
        highlight: 'Android e iOS',
        descripcion: 'Tu negocio en el bolsillo de tus clientes. Aplicaciones nativas y multiplataforma con Flutter y React Native que funcionan rápido, se ven bien y escalan con tu empresa.',
        imagen: movil,
        features: [
            'Notificaciones en tiempo real',
            'GPS, cámara y pagos integrados',
            'Funciona sin conexión (modo offline)',
            'Publicación en Play Store y App Store',
        ],
    },
    {
        id: 1,
        icon: '🌐',
        title: 'Sitio Web',
        highlight: 'Rápido y responsivo',
        descripcion: 'Desde una landing page hasta un sistema completo. Construido con React para que cargue rápido, se vea bien en cualquier dispositivo y sea fácil de actualizar.',
        imagen: web,
        features: [
            'Diseño adaptado a celular, tablet y PC',
            'SEO técnico desde la base',
            'Formularios, chat y páginas de pago',
            'Fácil de actualizar sin tocar código',
        ],
    },
    {
        id: 2,
        icon: '🖥️',
        title: 'Software de Escritorio',
        highlight: 'Para tu operación interna',
        descripcion: 'Sistemas que corren directo en tu computadora, sin depender de internet. Inventario, facturación, reportes y control interno adaptados exactamente a tu flujo de trabajo.',
        imagen: escritorio,
        features: [
            'Inventario y control de stock',
            'Facturación y reportes automáticos',
            'Gestión de usuarios y permisos',
            'Integración con impresoras y dispositivos',
        ],
    },
    {
        id: 3,
        icon: '🗄️',
        title: 'Base de Datos',
        highlight: 'Tu información, organizada',
        descripcion: 'Diseñamos la estructura de datos correcta desde el principio para que tu sistema no colapse cuando crezca. PostgreSQL, MySQL, MongoDB o Firebase según lo que necesites.',
        imagen: basedatos,
        features: [
            'Estructura optimizada para escalar',
            'Respaldos automáticos configurados',
            'Consultas rápidas aunque el volumen crezca',
            'Seguridad y control de acceso por rol',
        ],
    },
];

const Servicios = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [panelKey, setPanelKey] = useState(0);

    const handleSelect = (index) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
        setPanelKey(prev => prev + 1);
    };

    // Auto-avance cada 6s si el usuario no interactúa
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => {
                const next = (prev + 1) % servicios.length;
                setPanelKey(k => k + 1);
                return next;
            });
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const current = servicios[activeIndex];

    return (
        <section id="entornos" className="animate-on-scroll">
            <div className="entornos-header">
                <span className="section-label">Servicios</span>
                <h2 className="section-title">
                    Entornos de <span className="gradient-text">Desarrollo</span>
                </h2>
                <p className="section-subtitle">
                    Elige el tipo de solución que necesita tu negocio.
                </p>
            </div>

            {/* Tabs */}
            <div className="servicios-tabs">
                {servicios.map((s, i) => (
                    <button
                        key={s.id}
                        className={`servicio-tab ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => handleSelect(i)}
                    >
                        <span className="tab-icon">{s.icon}</span>
                        {s.title}
                    </button>
                ))}
            </div>

            {/* Panel */}
            <div className="servicios-panel panel-fade" key={panelKey}>
                {/* Imagen */}
                <div className="panel-imagen">
                    <div className="panel-imagen-glow" />
                    <img src={current.imagen} alt={current.title} />
                </div>

                {/* Texto */}
                <div className="panel-texto">
                    <span className="panel-numero">0{activeIndex + 1} / 0{servicios.length}</span>
                    <h3 className="panel-titulo">
                        {current.title}<br />
                        <span>{current.highlight}</span>
                    </h3>
                    <p className="panel-descripcion">{current.descripcion}</p>
                    <div className="panel-features">
                        {current.features.map((f, i) => (
                            <div key={i} className="panel-feature">
                                <span className="feature-dot" />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Nav dots */}
            <div className="servicios-nav">
                {servicios.map((_, i) => (
                    <button
                        key={i}
                        className={`nav-dot ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => handleSelect(i)}
                        aria-label={`Ver ${servicios[i].title}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Servicios;