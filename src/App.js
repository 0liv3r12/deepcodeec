import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Componentes/NavBar';
import './App.css';
import Home from './Secciones/home';
import Servicios from './Secciones/servicios';
import Proyectos from './Secciones/proyectos';
import Nosotros from './Secciones/nosotros';
import ScrollAnimationHandler from './Componentes/ScrollAnimationHandler';
import ProyectoLanding from './Secciones/proyectoLanding';

function PaginaPrincipal() {
  const { hash } = useLocation();

  // Si se llega con un #ancla (ej. al volver desde la página de un proyecto
  // con "← Volver a proyectos"), hace scroll hasta esa sección.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const intento = () => {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return true; }
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
      <Nosotros />
      <ScrollAnimationHandler />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/proyecto/:entornoId/:proyectoId" element={<ProyectoLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



