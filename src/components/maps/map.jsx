// components/MapContainer.js
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapContainer = ({ centerCoords }) => {
  return (
    <div className="flex flex-col md:flex-row">
    {/* Columna Izquierda (Información) */}
    <div className="md:w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4">Información</h2>
      {/* Agrega aquí el contenido de la columna izquierda */}
    </div>

    {/* Columna Derecha (Mapa) */}
    <div className="md:w-1/2">
      <GoogleMap mapContainerStyle={{ height: '400px', width: '100%' }} center={centerCoords} zoom={12}>
        <Marker position={centerCoords} />
      </GoogleMap>
    </div>
  </div>
  );
};

export default MapContainer;