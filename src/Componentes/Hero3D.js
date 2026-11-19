/* Escena 3D del hero: el símbolo <D> de DeepCodeEc extruido, dos anillos con un
   satélite y un campo de partículas. three.js vanilla.
   Este archivo SOLO se carga con import() dinámico desde home.js: three.js
   nunca entra en el bundle principal. */
import {
    WebGLRenderer, Scene, PerspectiveCamera, Group, Shape, Vector2,
    ExtrudeGeometry, EdgesGeometry, TorusGeometry, SphereGeometry, BufferGeometry,
    Float32BufferAttribute, Mesh, LineSegments, Points,
    MeshPhysicalMaterial, MeshBasicMaterial, LineBasicMaterial, PointsMaterial,
    PMREMGenerator, DirectionalLight, NoToneMapping,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PIEZAS_D, MARCA_ANCHO, MARCA_ALTO } from './MarcaD';

const AZUL = 0x38b6ff;
const AZUL_PROFUNDO = 0x1570c9;
const HIELO = 0xbde8ff;
const ANCHO_LOGO = 4;          // unidades 3D
const INTRO_S = 1.4;
const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

/* Polígono plano del logo (y hacia abajo) → Shape de three (y hacia arriba), centrado. */
const aShape = (pts) => {
    const k = ANCHO_LOGO / MARCA_ANCHO;
    const v = [];
    for (let i = 0; i < pts.length; i += 2) {
        v.push(new Vector2((pts[i] - MARCA_ANCHO / 2) * k, -(pts[i + 1] - MARCA_ALTO / 2) * k));
    }
    return new Shape(v);
};

const extruir = (pts) => {
    const g = new ExtrudeGeometry(aShape(pts), {
        depth: 0.34,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.022,
        bevelSegments: 2,
    });
    g.translate(0, 0, -0.17);
    return g;
};

export default function montarEscena(contenedor, { movil = false, reducido = false, onListo } = {}) {
    // ── Renderer ──
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    let dpr = Math.min(window.devicePixelRatio || 1, movil ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    contenedor.appendChild(renderer.domElement);

    const escena = new Scene();
    const camara = new PerspectiveCamera(35, 1, 0.1, 100);

    // Reflejos sin descargar HDR
    const pmrem = new PMREMGenerator(renderer);
    const entorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    escena.environment = entorno;

    renderer.toneMapping = NoToneMapping; // el tone mapping desatura y corre el azul de marca

    const luz = new DirectionalLight(0xffffff, 0.6);
    luz.position.set(3, 4, 5);
    escena.add(luz);

    // ── Símbolo <D> ──
    const marca = new Group();
    escena.add(marca);

    // Sin tone mapping y con poca luz sumada: si la luz se suma encima del azul
    // (B ya está en 255) solo suben R y G y el color se corre a cian.
    const matCorchete = new MeshPhysicalMaterial({
        color: AZUL, emissive: AZUL, emissiveIntensity: 0.76,
        metalness: 0, roughness: 0.45, envMapIntensity: 0.08,
        clearcoat: 0.5, clearcoatRoughness: 0.2,
    });
    // La D: azul de marca metálico, emisión azul profunda en las sombras
    // y bordes azul hielo para que no se funda con los corchetes.
    const matD = new MeshPhysicalMaterial({
        color: AZUL, emissive: AZUL_PROFUNDO, emissiveIntensity: 0.6,
        metalness: 0.7, roughness: 0.28, envMapIntensity: 0.9,
        clearcoat: 1, clearcoatRoughness: 0.1,
    });

    // envMap propio: con scene.environment three ignora el envMapIntensity del material
    matCorchete.envMap = entorno;
    matD.envMap = entorno;

    const corcheteIzq = new Mesh(extruir(PIEZAS_D.corcheteIzq), matCorchete);
    const corcheteDer = new Mesh(extruir(PIEZAS_D.corcheteDer), matCorchete);
    const geoD = extruir(PIEZAS_D.d);
    const letraD = new Mesh(geoD, matD);
    const bordesD = new LineSegments(new EdgesGeometry(geoD, 30), new LineBasicMaterial({ color: HIELO }));
    letraD.add(bordesD);
    marca.add(corcheteIzq, corcheteDer, letraD);

    // ── Anillos orbitales + satélite ──
    const anillos = new Group();
    escena.add(anillos);
    const matAnillo = new MeshBasicMaterial({ color: AZUL, transparent: true, opacity: 0.32 });
    const crearAnillo = (radio, rx, ry) => {
        const m = new Mesh(new TorusGeometry(radio, 0.007, 6, 220), matAnillo);
        m.rotation.set(rx, ry, 0);
        anillos.add(m);
        return m;
    };
    const anillo1 = crearAnillo(2.9, 1.2, 0.35);
    crearAnillo(3.4, 1.85, -0.45);
    const satelite = new Mesh(new SphereGeometry(0.055, 16, 16), new MeshBasicMaterial({ color: HIELO }));
    anillo1.add(satelite);

    // ── Partículas ──
    const total = movil ? 260 : 700;
    const pos = new Float32Array(total * 3);
    for (let i = 0; i < total; i++) {
        const r = 3 + Math.random() * 5;
        const t = Math.random() * Math.PI * 2;
        const f = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(f) * Math.cos(t);
        pos[i * 3 + 1] = r * Math.sin(f) * Math.sin(t) * 0.7;
        pos[i * 3 + 2] = r * Math.cos(f) - 2;
    }
    const geoParticulas = new BufferGeometry();
    geoParticulas.setAttribute('position', new Float32BufferAttribute(pos, 3));
    const particulas = new Points(geoParticulas, new PointsMaterial({
        color: AZUL_PROFUNDO, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false,
    }));
    escena.add(particulas);

    // ── Estado de animación ──
    const raton = { x: 0, y: 0 };
    const giro = { x: 0, y: 0 };
    let tiempo = 0;
    let ultimo = 0;
    let listo = false;
    let visible = true;
    let frames = 0;
    let acumulado = 0;
    let fpsRevisado = false;

    const pose = (t, dt) => {
        const e = easeOutExpo(Math.min(t / INTRO_S, 1));
        // Intro: los corchetes se cierran sobre la D
        corcheteIzq.position.x = -1.6 * (1 - e);
        corcheteDer.position.x = 1.6 * (1 - e);
        corcheteIzq.rotation.y = 0.7 * (1 - e);
        corcheteDer.rotation.y = -0.7 * (1 - e);
        letraD.scale.setScalar(0.85 + 0.15 * e);

        // Scroll: sube y gira un poco
        const scroll = Math.min(window.scrollY / window.innerHeight, 1);
        const suave = 1 - Math.pow(0.001, dt); // suavizado independiente de los FPS
        giro.y += (raton.x * 0.35 + scroll * 0.6 - giro.y) * suave;
        giro.x += (raton.y * 0.2 - giro.x) * suave;
        marca.rotation.set(giro.x, giro.y, 0);
        marca.position.y = Math.sin(t * 0.9) * 0.08 + scroll * 1.2;

        anillos.rotation.y = t * 0.08 + giro.y * 0.5;
        anillos.position.y = marca.position.y * 0.6;
        satelite.position.set(Math.cos(t * 0.7) * 2.9, Math.sin(t * 0.7) * 2.9, 0);
        particulas.rotation.y = t * 0.02;
    };

    const dibujar = () => {
        renderer.render(escena, camara);
        if (!listo) {
            listo = true;
            onListo?.();
        }
    };

    const tick = (ahora) => {
        const dt = ultimo ? Math.min((ahora - ultimo) / 1000, 0.05) : 1 / 60;
        ultimo = ahora;
        tiempo += dt;

        // Si va lento en los primeros ~90 frames, baja la resolución a 1x
        if (!fpsRevisado && tiempo > 0.5) {
            frames++;
            acumulado += dt;
            if (frames === 90) {
                fpsRevisado = true;
                if (frames / acumulado < 45 && dpr > 1) {
                    dpr = 1;
                    renderer.setPixelRatio(1);
                    ajustarTamano();
                }
            }
        }

        pose(tiempo, dt);
        dibujar();
    };

    // Un solo frame estático para reduced-motion
    const frameEstatico = () => {
        pose(INTRO_S, 1);
        dibujar();
    };

    const actualizarLoop = () => {
        const correr = !reducido && visible && !document.hidden;
        ultimo = 0;
        renderer.setAnimationLoop(correr ? tick : null);
    };

    // ── Tamaño ──
    const ajustarTamano = () => {
        const w = contenedor.clientWidth;
        const h = contenedor.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camara.aspect = w / h;
        // Encaja ~7.5 unidades de ancho sin importar la proporción
        camara.position.z = Math.min(Math.max(11.9 / camara.aspect, 9), 16);
        camara.updateProjectionMatrix();
        if (reducido) frameEstatico();
    };
    const ro = new ResizeObserver(ajustarTamano);
    ro.observe(contenedor);
    ajustarTamano();

    // ── Pausa si el hero no se ve o la pestaña está oculta ──
    const io = new IntersectionObserver(([entrada]) => {
        visible = entrada.isIntersecting;
        actualizarLoop();
    });
    io.observe(contenedor);
    document.addEventListener('visibilitychange', actualizarLoop);

    const alMover = (e) => {
        raton.x = (e.clientX / window.innerWidth) * 2 - 1;
        raton.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', alMover, { passive: true });

    if (reducido) frameEstatico();
    else actualizarLoop();

    // ── Limpieza total ──
    return function destruir() {
        renderer.setAnimationLoop(null);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', actualizarLoop);
        window.removeEventListener('pointermove', alMover);

        escena.traverse((obj) => {
            obj.geometry?.dispose();
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => m?.dispose());
        });
        entorno.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
    };
}
