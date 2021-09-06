import {React, useState} from 'react';

const Producto = (props) => {

  const items = props;
  
  return (
    <div className = "row style-border">
      
        <div className="col">
            {items.inventario.nombre_item}
        </div>
        <div className="col">
            {items.inventario.cantidad}
        </div>
        <div className="col">
            {items.inventario.ultima_fecha}
        </div>
        <div className="col">
            {items.inventario.cantidad < 20 ? "Pocas unidades restantes":"Sufucientes unidades"}
        </div>

    </div>
  );
};

export default Producto;