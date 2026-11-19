import { img } from '../utils/imageLoader';
export const colorDeepCode = { from: '#38b6ff', to: '#1570C9' };

export const proyectosPorEntorno = {
    escritorio: [
        {
            id: 1,
            nombre: 'KORE',
            titular: 'Gestión de clientes, ordenada.',
            descripcion: 'Sistema de escritorio para administrar clientes, contratos e información operativa desde un panel central.',
            tags: ['JavaScript', 'MySQL', 'CRUD', 'Dashboard'],
            stack: ['JavaScript', 'MySQL', 'Electron'],
            features: [
                'Gestión completa de clientes y contratos',
                'Panel de control con métricas en tiempo real',
                'Búsqueda y filtrado avanzado de registros',
            ],
            color: colorDeepCode, // TODO: reemplazar por el color real de este sistema
            captura: img('vDe2.avif'), // imagen del caso en el home
            // Caso: Problema → Solución (descripcion) → Resultado. Solo se muestran si tienen texto.
            // TODO Oliver: el problema real del cliente. Borrador: "La información de clientes y contratos estaba repartida en hojas de cálculo y papeles."
            problema: null,
            // TODO Oliver: resultado real y medible (no inventar). Ej.: tiempo ahorrado, errores evitados.
            resultado: null,
            galeria: [
                { type: 'img', src: img('vDe1.avif'), label: 'Login' },
                { type: 'img', src: img('vDe2.avif'), label: 'Dashboard' },
                { type: 'img', src: img('vDe3.avif'), label: 'Informacion de Clientes' },
                { type: 'img', src: img('vDe4.avif'), label: 'Registro de Clientes' },
                { type: 'img', src: img('vDe5.avif'), label: 'Perfil de Usuario' },
            ],
        },
        // Agrega más proyectos de escritorio aquí
    ],
    movil: [
        {
            id: 1,
            nombre: 'Vitaria',
            titular: 'Tu salud, en tus manos.',
            descripcion: 'Vitaria conecta pacientes con especialistas médicos: agenda de citas, recordatorios automáticos y seguimiento, todo desde el celular.',
            tags: ['Flutter', 'Dart', 'Citas Médicas', 'UI/UX'],
            stack: ['Flutter', 'Dart', 'Firebase'],
            features: [
                'Agenda de citas con especialistas médicos',
                'Recordatorios automáticos de cada cita',
                'Panel de administración para médicos',
            ],
            color: colorDeepCode, // TODO: reemplazar por el color real de Vitaria
            captura: img('vDm6.avif'),
            // TODO Oliver: el problema real. Borrador: "Las citas se coordinaban por llamadas y mensajes, con olvidos y espacios vacíos en la agenda."
            problema: null,
            // TODO Oliver: resultado real y medible (no inventar).
            resultado: null,
            galeria: [
                { type: 'img', src: img('vDm1.avif'), label: 'Onboarding' },
                { type: 'img', src: img('vDm2.avif'), label: 'Onboarding' },
                { type: 'img', src: img('vDm3.avif'), label: 'Onboarding' },
                { type: 'img', src: img('vDm4.avif'), label: 'Login' },
                { type: 'img', src: img('vDm5.avif'), label: 'Registro' },
                { type: 'img', src: img('vDm6.avif'), label: 'Inicio' },
                { type: 'img', src: img('vDm7.avif'), label: 'Mis Citas' },
                { type: 'img', src: img('vDm8.avif'), label: 'Perfil de Usuario' },
                { type: 'img', src: img('vDm9.avif'), label: 'Panel Admin' },
                { type: 'img', src: img('vDm10.avif'), label: 'Calendario' },
                { type: 'img', src: img('vDm11.avif'), label: 'Pacientes' },
            ],
        },
        // Agrega más proyectos móviles aquí
    ],
    web: [
        {
            id: 1,
            nombre: 'Ambre',
            titular: 'Tu restaurante, servido en digital.',
            descripcion: 'Sitio web completo para restaurantes: menú digital, reservas online con confirmación automática, métodos de pago y un panel de administración para que el dueño gestione todo sin depender de un desarrollador.',
            tags: ['React', 'Node.js', 'Reservas Online', 'Panel Admin'],
            stack: ['React', 'Express', 'Prisma', 'SQLite'],
            features: [
                'Reservas online con confirmación automática por WhatsApp',
                'Menú digital, eventos y selección de métodos de pago',
                'Panel de administración para gestionar todo el contenido',
            ],
            color: { from: '#c9a227', to: '#f5c451' }, // paleta dorada real de Ambre
            captura: img('inicio.avif'),
            // TODO Oliver: el problema real. Borrador: "Las reservas llegaban por llamadas y mensajes sueltos, y cambiar el menú dependía de un desarrollador."
            problema: null,
            // TODO Oliver: resultado real y medible (no inventar).
            resultado: null,
            galeria: [
                { type: 'img', src: img('inicio.avif'), label: 'Inicio' },
                { type: 'img', src: img('menu.avif'), label: 'Menu' },
                { type: 'img', src: img('proximos-eventos.avif'), label: 'Proximos Eventos' },
                { type: 'img', src: img('Eventos-Hecho.avif'), label: 'Eventos Hechos Realidad' },
                { type: 'img', src: img('servicios.avif'), label: 'Servicios' },
                { type: 'img', src: img('reserva.avif'), label: 'Reserva' },
                { type: 'img', src: img('reserva-hecha.avif'), label: 'Reserva Hecha' },
                { type: 'img', src: img('ubicanos.avif'), label: 'Ubicanos' },
                
            ],
        },
        // Agrega más proyectos web aquí
    ],
    bd: [],
};

export const entornos = [
    { id: 'web', nombre: 'Web', dispositivo: 'computer' },
    { id: 'movil', nombre: 'Móvil', dispositivo: 'phone' },
    { id: 'escritorio', nombre: 'Escritorio', dispositivo: 'computer' },
    { id: 'bd', nombre: 'Base de Datos', dispositivo: 'computer' },
];

/* Cada entorno con su lista de proyectos ya resuelta. */
export const entornosConProyectos = entornos.map(e => ({
    ...e,
    lista: proyectosPorEntorno[e.id] || [],
}));

/* Devuelve { entorno, proyecto } o null si la URL no corresponde a ninguno. */
export const buscarProyecto = (entornoId, proyectoId) => {
    const entorno = entornosConProyectos.find(e => e.id === entornoId);
    const proyecto = entorno?.lista.find(p => String(p.id) === proyectoId);
    return entorno && proyecto ? { entorno, proyecto } : null;
};