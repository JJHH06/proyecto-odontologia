import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import './Tooth.css';
import axios from 'axios'


function Tooth({id_paciente,tooth_id,setSelectedPiece}) {
  
  const handleClick = () =>{
    //alert("Se ha hecho click en el diente " + props.tooth_id + "Del paciente "+props.id_paciente)

    let diente = {id_pieza: tooth_id, bucal:[], lingual:[], distal:[], mesial:[], oclusal:[]};
    let index = {bucal:3, lingual:1, distal:2, mesial:4, oclusal:0};
    if ((diente.id_pieza >= 11 && diente.id_pieza<=18) || (diente.id_pieza >= 51 && diente.id_pieza<=55)){
      console.log("Esquina superior izquierda")
      index = {bucal:1, lingual:3, distal:4, mesial:2, oclusal:0};


    } else if ((diente.id_pieza >= 21 && diente.id_pieza<=28) || (diente.id_pieza >= 61 && diente.id_pieza<=65)){
      console.log("Esquina superior derecha")
      index = {bucal:1, lingual:3, distal:2, mesial:4, oclusal:0};
      

    } else if ((diente.id_pieza >= 41 && diente.id_pieza<=48) || (diente.id_pieza >= 81 && diente.id_pieza<=85)){
      console.log("Esquina inferior izquierda")
      // solo cambia distal y mesial
      index = {bucal:3, lingual:1, distal:4, mesial:2, oclusal:0};
    } else{
      console.log("Esquina inferior derecha") 
    }
    //Aqui ya puedo hacer el request basado en los estados

    var data = JSON.stringify({
      "no_pieza": diente.id_pieza,
      "id_paciente": id_paciente
    });
    
    var config = {
      method: 'post',
      url: 'http://198.211.103.50:5000/api/tratamiento_paciente/getTratamientoByPieza',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then( (response) => {
      console.log(JSON.stringify(response.data.result));
      response.data.result.forEach(element =>{
        //let index = {bucal:3, lingual:1, distal:2, mesial:4, oclusal:0};
        //let diente = {id_pieza: props.tooth_id, bucal:[], lingual:[], distal:[], mesial:[], oclusal:[]};
        if(element.seccion === index.oclusal){
          diente.oclusal = [...diente.oclusal, element.nombre_tratamiento]
        }
        else if(element.seccion === index.bucal){
          diente.bucal = [...diente.bucal, element.nombre_tratamiento]
        }
        else if(element.seccion === index.lingual){
          diente.lingual = [...diente.lingual, element.nombre_tratamiento]
        } 
        else if(element.seccion === index.distal){
          diente.distal = [...diente.distal, element.nombre_tratamiento]
        }
        else if(element.seccion === index.mesial){
          diente.mesial = [...diente.mesial, element.nombre_tratamiento]
        }
      })
      console.log(diente)
      //aqui se madna a llamar el push
      setSelectedPiece(diente)
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    //props.setSelectedPiece();
  }

  //handle left click function
  const handleEditTooth = () =>{
    alert("Se ha hecho click derecho en el diente " + tooth_id + "Del paciente "+id_paciente)
  }
  

  return (
      
    <svg onClick = {handleClick} onContextMenu = {handleEditTooth} class="tooth">
        {/* transform="translate(0,0)" */}
      <g transform ="scale(1.5)">
        <polygon points="0,0 20,0 15,5 5,5" class=""></polygon>
        <polygon points="5,15 15,15 20,20 0,20" class=""></polygon>
        <polygon points="15,5 20,0 20,20 15,15" class=""></polygon>
        <polygon points="0,0 5,5 5,15 0,20" class=""></polygon>
        <polygon points="5,5 15,5 15,15 5,15" class=""></polygon>
        <text
          x="6"
          y="30"
          stroke="navy"
          fill="navy"
          stroke-width="0.1"
          class="tooth"
        >
          {tooth_id}
        </text>
      </g>
    </svg>
    
  );
}

// Tooth.propTypes = {
//     tooth_id: PropTypes.number.isRequired,
// };

export default Tooth;
