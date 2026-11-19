import React, { useRef, useState } from 'react';
import MarcaD from '../Componentes/MarcaD';
import { whatsapp, WHATSAPP_URL, WHATSAPP_NUMERO, INSTAGRAM_URL } from '../Data/contacto';
import '../Estilos/contacto.css';

const TIPOS = ['Sitio web', 'App móvil', 'Software de escritorio', 'Base de datos', 'Aún no lo sé'];
const LIMITES = { nombre: 80, mensaje: 600 };

// Cambia caracteres de control por espacios (deja los saltos de línea del mensaje) y recorta.
// Sin saltos (nombre) además junta los espacios repetidos.
export const limpiar = (texto, conSaltos = false) => {
    const sinControl = Array.from(texto, (ch) => {
        const c = ch.charCodeAt(0);
        const control = c < 32 || c === 127;
        return control && !(conSaltos && c === 10) ? ' ' : ch;
    }).join('');
    return (conSaltos ? sinControl : sinControl.replace(/ {2,}/g, ' ')).trim();
};

export const validar = ({ nombre, tipo, mensaje }) => {
    const errores = {};
    if (nombre.length < 2) errores.nombre = 'Escribe tu nombre (mínimo 2 letras).';
    else if (nombre.length > LIMITES.nombre) errores.nombre = `Máximo ${LIMITES.nombre} caracteres.`;
    if (!TIPOS.includes(tipo)) errores.tipo = 'Elige qué tipo de proyecto necesitas.';
    if (mensaje.length < 10) errores.mensaje = 'Cuéntame un poco más (mínimo 10 caracteres).';
    else if (mensaje.length > LIMITES.mensaje) errores.mensaje = `Máximo ${LIMITES.mensaje} caracteres.`;
    return errores;
};

/* La web es estática (GitHub Pages, sin backend): el formulario arma el mensaje
   y abre WhatsApp. No se guarda ni se envía nada a ningún servidor. */
const Contacto = () => {
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);
    const formRef = useRef(null);

    const alEnviar = (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const datos = {
            nombre: limpiar(String(f.get('nombre') || '')),
            tipo: String(f.get('tipo') || ''),
            mensaje: limpiar(String(f.get('mensaje') || ''), true),
        };
        const nuevos = validar(datos);
        setErrores(nuevos);
        if (Object.keys(nuevos).length) {
            // El foco va al primer campo con error, que anuncia su mensaje
            formRef.current.querySelector(`[name="${Object.keys(nuevos)[0]}"]`)?.focus();
            setEnviado(false);
            return;
        }
        const texto = `Hola DeepCodeEc, soy ${datos.nombre}.\nQuiero cotizar: ${datos.tipo}.\n\n${datos.mensaje}`;
        const url = whatsapp(texto);
        const ventana = window.open(url, '_blank', 'noopener,noreferrer');
        if (!ventana) window.location.href = url; // si el navegador bloquea la pestaña nueva
        setEnviado(true);
    };

    // Props de accesibilidad de cada campo según su error
    const campo = (nombre) => ({
        id: `contacto-${nombre}`,
        name: nombre,
        'aria-invalid': errores[nombre] ? 'true' : undefined,
        'aria-describedby': errores[nombre] ? `contacto-${nombre}-error` : undefined,
    });
    const MensajeError = ({ de }) => errores[de]
        ? <p className="campo-error" id={`contacto-${de}-error`}><span aria-hidden="true">!</span> {errores[de]}</p>
        : null;

    return (
        <section id="contacto">
            <div className="contacto-panel" data-reveal>
                <MarcaD className="contacto-marca" />

                <div className="contacto-texto">
                    <span className="section-label">Contacto</span>
                    <h2 className="section-title">
                        Hablemos de <span className="gradient-text">tu proyecto.</span>
                    </h2>
                    <p className="section-subtitle">
                        Cuéntame qué necesitas y te respondo por WhatsApp con una propuesta clara,
                        sin compromiso.
                    </p>
                    <ul className="contacto-canales">
                        <li>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                <span className="canal-etiqueta">WhatsApp</span>
                                +{WHATSAPP_NUMERO.slice(0, 3)} {WHATSAPP_NUMERO.slice(3, 5)} {WHATSAPP_NUMERO.slice(5, 8)} {WHATSAPP_NUMERO.slice(8)}
                            </a>
                        </li>
                        <li>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                                <span className="canal-etiqueta">Instagram</span>
                                @deepcodeec
                            </a>
                        </li>
                    </ul>
                </div>

                <form className="contacto-form" ref={formRef} onSubmit={alEnviar} noValidate>
                    <div className="campo">
                        <label htmlFor="contacto-nombre">Tu nombre</label>
                        <input {...campo('nombre')} type="text" autoComplete="name" maxLength={LIMITES.nombre} required />
                        <MensajeError de="nombre" />
                    </div>

                    <div className="campo">
                        <label htmlFor="contacto-tipo">Tipo de proyecto</label>
                        <select {...campo('tipo')} defaultValue="" required>
                            <option value="" disabled>Elige una opción</option>
                            {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <MensajeError de="tipo" />
                    </div>

                    <div className="campo">
                        <label htmlFor="contacto-mensaje">¿Qué necesitas?</label>
                        <textarea
                            {...campo('mensaje')}
                            rows={4}
                            maxLength={LIMITES.mensaje}
                            placeholder="Ej.: quiero que mis clientes reserven y paguen en línea."
                            required
                        />
                        <MensajeError de="mensaje" />
                    </div>

                    <button type="submit" className="btn-primary contacto-enviar">
                        Enviar por WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
                    </button>

                    <p className="contacto-estado" role="status">
                        {enviado && 'Listo: se abrió WhatsApp con tu mensaje. Solo tienes que enviarlo.'}
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Contacto;
