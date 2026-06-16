import React from 'react';
import Navbar from './Componentes/NavBar';
import './App.css';
import Home from './Secciones/home';
import Servicios from './Secciones/servicios';
import Proyectos from './Secciones/proyectos';
import Nosotros from './Secciones/nosotros';
import ScrollAnimationHandler from './Componentes/ScrollAnimationHandler';

function App() {
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

export default App;




