import { img } from '../utils/imageLoader';
const colorDeepCode = { from: '#38b6ff', to: '#8b5cf6' };

export const proyectosPorEntorno = {
    escritorio: [
        {
            id: 1,
            nombre: 'KORE',
            titular: 'Gestión de clientes, ordenada.',
            descripcion: 'Sistema de escritorio para administrar clientes, contratos e información operativa desde un panel central.',
            tags: ['JavaScript', 'MySQL', 'CRUD', 'Dashboard'],
            portada: img('iconKore.avif'),
            stack: ['JavaScript', 'MySQL', 'Electron'],
            features: [
                'Gestión completa de clientes y contratos',
                'Panel de control con métricas en tiempo real',
                'Búsqueda y filtrado avanzado de registros',
            ],
            color: colorDeepCode, // TODO: reemplazar por el color real de este sistema
            galeria: [
                { type: 'img', src: img('vDe1.png'), label: 'Login' },
                { type: 'img', src: img('vDe2.png'), label: 'Dashboard' },
                { type: 'img', src: img('vDe3.jpg'), label: 'Informacion de Clientes' },
                { type: 'img', src: img('vDe4.png'), label: 'Registro de Clientes' },
                { type: 'img', src: img('vDe5.png'), label: 'Perfil de Usuario' },
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
            portada: img('iconVitaria.avif'), 
            stack: ['Flutter', 'Dart', 'Firebase'],
            features: [
                'Agenda de citas con especialistas médicos',
                'Recordatorios automáticos de cada cita',
                'Panel de administración para médicos',
            ],
            color: colorDeepCode, // TODO: reemplazar por el color real de Vitaria
            galeria: [
                { type: 'img', src: img('vDm1.png'), label: 'Onboarding' },
                { type: 'img', src: img('vDm2.png'), label: 'Onboarding' },
                { type: 'img', src: img('vDm3.png'), label: 'Onboarding' },
                { type: 'img', src: img('vDm4.png'), label: 'Login' },
                { type: 'img', src: img('vDm5.png'), label: 'Registro' },
                { type: 'img', src: img('vDm6.png'), label: 'Inicio' },
                { type: 'img', src: img('vDm7.png'), label: 'Mis Citas' },
                { type: 'img', src: img('vDm8.png'), label: 'Perfil de Usuario' },
                { type: 'img', src: img('vDm9.png'), label: 'Panel Admin' },
                { type: 'img', src: img('vDm10.png'), label: 'Calendario' },
                { type: 'img', src: img('vDm11.png'), label: 'Pacientes' },
            ],
        },
        // Agrega más proyectos móviles aquí
    ],
    web: [],
    bd: [],
};

export const entornos = [
    { id: 'web', nombre: 'Web', dispositivo: 'computer' },
    { id: 'movil', nombre: 'Móvil', dispositivo: 'phone' },
    { id: 'escritorio', nombre: 'Escritorio', dispositivo: 'computer' },
    { id: 'bd', nombre: 'Base de Datos', dispositivo: 'computer' },
];