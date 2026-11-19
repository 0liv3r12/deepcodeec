import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Componentes/NavBar';
import './App.css';
import Home from './Secciones/home';
import Servicios from './Secciones/servicios';
import Proyectos from './Secciones/proyectos';
import Proceso from './Secciones/proceso';
import Nosotros from './Secciones/nosotros';
import Contacto from './Secciones/contacto';
import Footer from './Componentes/Footer';
import ScrollAnimationHandler from './Componentes/ScrollAnimationHandler';
import ProyectoLanding from './Secciones/proyectoLanding';

function PaginaPrincipal() {
  const { hash } = useLocation();

  // Si se llega con un #ancla (ej. al volver desde la página de un proyecto
  // con "← Volver a proyectos"), salta a esa sección. Layout effect + salto
  // instantáneo: así la transición de página ya muestra la sección correcta.
  useLayoutEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const intento = () => {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'instant', block: 'start' }); return true; }
      return false;
    };
    if (!intento()) {
      const t = setTimeout(intento, 80);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <>
      <div className="dc-bg" aria-hidden="true" />
      <Navbar />
      <Home />
      <Servicios />
      <Proyectos />
      <Proceso />
      <Nosotros />
      <Contacto />
      <Footer />
    </>
  );
}

function App() {
  return (
    // useTransitions={false}: el cambio de ruta se pinta sincrónico, necesario
    // para que LinkTransicion capture la página nueva en la View Transition.
    <BrowserRouter useTransitions={false}>
      {/* Fuera de Routes: un solo observer y un solo listener para todas las páginas */}
      <ScrollAnimationHandler />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/proyecto/:entornoId/:proyectoId" element={<ProyectoLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



