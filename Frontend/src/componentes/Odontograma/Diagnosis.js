import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Diagnosis.css";
import tooth_mock from "./Assets/tooth.png";

const options = [
  { value: "1", label: "Matemática" },
  { value: "2", label: "Física" },
  { value: "3", label: "Química" },
  { value: "4", label: "Biología" },
  { value: "5", label: "Lenguaje" },
];

function Diagnosis({ setIsToothInDiagnosis, currentDiagnosisTooth }) {
  let defaultOclusal = [];
  let defaultBucal = [];
  let defaultDistal = [];
  let defaultMolar = [];
  let defaultLingual = [];

    const handleCancel = () => {
        setIsToothInDiagnosis(false);
    }

  return (
    <>
      <div className="row">
        <h1 className='diagnosis-title'>Diagnostico pieza {currentDiagnosisTooth}</h1>
        <div className="responsive-tooth-container col-md-4">
          <img src={tooth_mock} width="100" alt="tooth_mock" />
        </div>
        <div className="diagnosis-treatments-container col-md-8">
          {/* <div className="diagnosis-treatments-container-title">
            <h2>Tratamientos</h2>
          </div> */}
          <h3>Oclusal:</h3>
          <Select
            defaultValue={defaultOclusal}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Seleccione tratamientos a realizar..."
          />
          <h3>Bucal:</h3>
          <Select
            defaultValue={defaultBucal}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Seleccione tratamientos a realizar..."
          />
          <h3>Molar:</h3>
          <Select
            defaultValue={defaultMolar}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Seleccione tratamientos a realizar..."
          />

          <h3>Lingual:</h3>
          <Select
            defaultValue={defaultLingual}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Seleccione tratamientos a realizar..."
          />

          <h3>Distal:</h3>
          <Select
            defaultValue={defaultDistal}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Seleccione tratamientos a realizar..."
          />
        </div>
        
      </div>

      {/* make bootstrap save and cancel butons in a row and centered horizontally */}
      <div className="row diagnosis-button-separator">
        <div className=" save-diagnosis-button col-md-6">
          <button className="btn btn-outline-danger" onClick={handleCancel}>Cancelar</button>
        </div>
        <div className="save-diagnosis-button col-md-6">
          <button className="btn btn-outline-primary btn-lg">Guardar</button>
        </div>
      </div>
    </>
  );
}

export default Diagnosis;
