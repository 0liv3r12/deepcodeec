import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { buscarProyecto, colorDeepCode } from '../Data/proyectosData';
import useCarrusel from '../Componentes/Portafolio/useCarrusel';
import GaleriaDispositivo from '../Componentes/Portafolio/GaleriaDispositivo';
import DetalleProyecto from '../Componentes/Portafolio/DetalleProyecto';
import '../Estilos/proyectoLanding.css';
import logo from '../Imagenes/Logo.png';

const ProyectoLanding = () => {
    const { entornoId, proyectoId } = useParams();
    const encontrado = buscarProyecto(entornoId, proyectoId);
    const items = encontrado?.proyecto.galeria || [];
    const index = useCarrusel(items.length);

    if (!encontrado || items.length === 0) {
        return <Navigate to="/#proyectos" replace />;
    }

    const { entorno, proyecto } = encontrado;
    const color = proyecto.color || colorDeepCode;

    return (
        <div className="pl-page" style={{ '--acc-from': color.from, '--acc-to': color.to }}>
            <nav className="pl-nav">
                <img src={logo} alt="DeepCode" className="pl-logo" />
                <span className="pl-nav-entorno">{entorno.nombre}</span>
            </nav>

            <div className="pl-hero">
                <GaleriaDispositivo items={items} index={index} esComputadora={entorno.dispositivo === 'computer'} />
                <DetalleProyecto entorno={entorno} proyecto={proyecto} />
            </div>
        </div>
    );
};

export default ProyectoLanding;
