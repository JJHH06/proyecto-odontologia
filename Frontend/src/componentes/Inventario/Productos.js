import {React, useState} from 'react';

const Producto = (props) => {
    let cantidad = 100
//   const items = props;
//   const alerta = "Sufucientes unidades"

  
  return (
    <div className = "row style-border">
      
        <div className="col">
            {/* {items.inventario.nombre} */}
            Guates
        </div>
        <div className="col">
            {/* {items.inventario.cantidad} */}
            {cantidad}
        </div>
        <div className="col">
            {/* {items.inventario.ultima_fecha} */}
            05/09/2021
        </div>
        <div className="col">
            {/* {alerta} */}
            Sufucientes unidades
        </div>

    </div>
  );
};

export default Producto;