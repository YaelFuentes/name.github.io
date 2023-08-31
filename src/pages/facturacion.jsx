import MapContainer from '@/components/maps/map';
import React from 'react'

const Facturacion = (props) => {
  const coordinates = { lat: -32.897, lng: -68.830  };

  return (
    <div>
      <MapContainer centerCoords={coordinates}/>
    </div>
  )
}

export default Facturacion