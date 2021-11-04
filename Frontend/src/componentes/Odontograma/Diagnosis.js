import React, {useEffect, useState} from 'react';
import "./Diagnosis.css";
import CourseContainer from "./CourseContainer/CourseContainer";


const options = [
    { value: "1", label: "Matemática" },
    { value: "2", label: "Física" },
    { value: "3", label: "Química" },
    { value: "4", label: "Biología" },
    { value: "5", label: "Lenguaje" },
  ];

  
function Diagnosis(props) {
    return (
        <div className = "row">
            <div className = "col-md-8"></div>
            <div className = "col-md-4"></div>
        </div>
    )
}

export default Diagnosis
