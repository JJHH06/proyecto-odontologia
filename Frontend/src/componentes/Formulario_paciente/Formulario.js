import React, { useState } from "react";
import "./Formulario.scss";
import axios from "axios";
import { useHistory } from 'react-router'


function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function Formulario({token}) {
const history = useHistory()

  const [name, setName] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [civilState, setCivilState] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");
  const [lastDentistAppointment, setLastDentistAppointment] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [personalDoctor, setPersonalDoctor] = useState("");
  const [doctorNumber, setDoctorNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  const [medicalConditions, setMedicalConditions] = useState([]);

  const addCondition = (e) => {
    if (e.target.checked) {
      setMedicalConditions([...medicalConditions, e.target.value]);
    } else {
      setMedicalConditions(
        medicalConditions.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      nombre: name,
      telefono_casa: homePhone,
      telefono_celular: cellPhone,
      fecha_nacimiento: formatDate(birthDay),
      estado_civil: civilState,
      ocupacion: profession,
      direccion: address,
      recomendado_por: recommendedBy,
      visita_anterior_dentista: formatDate(lastDentistAppointment),
      motivo_consulta: appointmentReason,
      medico: personalDoctor,
      telefono_medico: doctorNumber,
      contacto_emergencia: emergencyContact,
      telefono_emergencia: emergencyNumber,
    });

    var config = {
      method: "post",
      url: "http://198.211.103.50:5000/api/paciente/addPaciente",
      headers: { 
        'Authorization': 'Bearer  ' + token, 
        'Content-Type': 'application/json'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        
        console.log(JSON.stringify(response.data));

        // Para ingresar las condiciones del paciente
        var newPatientConditions = JSON.stringify({
          id_paciente: response.data.result.id_paciente,
          condiciones: medicalConditions,
        });

        //Configuracion de las condiciones
        var configConditions = {
          method: "post",
          url: "http://198.211.103.50:5000/api/condiciones_paciente/addCondicionesPaciente",
          headers: { 
            'Authorization': 'Bearer  ' + token, 
            'Content-Type': 'application/json'
          },
          data: newPatientConditions,
        };

        
        //Post con Axios
        return  axios(configConditions)
          .then(function (response) {
            console.log("Con las condiciones", JSON.stringify(response.data));
            console.log(JSON.stringify(response.data));
            
            alert("Nuevo paciente ingresado con exito");
            history.go(0)
          })
          .catch(function (error) {
            alert("No se ha podido ingresar las condiciones medicas");
            console.log(error);
          });
      })
      .catch(function (error) {
        alert("No se ha podido ingresar el paciente");
        console.log(error);
      });
  };

  return (
    <div className="formulario-paciente" data-testid="patient-form">
      <div className="container border-style">
        <h1>Ficha Nuevo Paciente</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-space input-style">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="telefono_casa">Telefono de Casa</label>
            <input
              type="tel"
              name="telefono_casa"
              placeholder="12345678"
              className="form-control"
              onChange={(e) => setHomePhone(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="telefono_celular">Celular</label>
            <input
              type="tel"
              name="telefono_celular"
              placeholder="12345678"
              className="form-control"
              onChange={(e) => setCellPhone(e.target.value)}
            />
          </div>

          <div className="form-space input-style row">
            <label
              htmlFor="example-date-input1"
              className="col-4 col-form-label"
            >
              Fecha de nacimiento
            </label>
            <div className="col-12">
              <input
                className="form-control"
                type="date"
                id="example-date-input1"
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </div>
          </div>

          <div className="form-space input-style">
            <label htmlFor="estado_civil">Estado Civil</label>
            <input
              type="text"
              name="estado_civil"
              className="form-control"
              onChange={(e) => setCivilState(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="ocupacion">Ocupacion</label>
            <input
              type="text"
              name="ocupacion"
              className="form-control"
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="direccion">Direccion</label>
            <input
              type="text"
              name="direccion"
              className="form-control input-style"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="recomendado_por">Recomendado por</label>
            <input
              type="text"
              name="recomendado_por"
              className="form-control"
              onChange={(e) => setRecommendedBy(e.target.value)}
            />
          </div>

          <div className="form-space input-style row">
            <label
              htmlFor="example-date-input2"
              className="col-4 col-form-label"
            >
              Ultima visita al Dentista:
            </label>
            <div className="col-12">
              <input
                className="form-control"
                placeholder="yyyy-mm-dd"
                type="date"
                id="example-date-input2"
                onChange={(e) => setLastDentistAppointment(e.target.value)}
              />
            </div>

            <div className="form-space input-style">
              <label htmlFor="motivo_consulta">Motivo de consulta</label>
              <input
                type="text"
                name="motivo_consulta"
                className="form-control"
                onChange={(e) => setAppointmentReason(e.target.value)}
              />
            </div>
          </div>

          <div className="form-space input-style">
            <label htmlFor="doctor_personal">Doctor personal</label>
            <input
              type="text"
              name="doctor_personal"
              className="form-control"
              onChange={(e) => setPersonalDoctor(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="telefono_doctor">
              Telefono del doctor personal
            </label>
            <input
              type="tel"
              name="telefono_doctor"
              placeholder="12345678"
              className="form-control"
              onChange={(e) => setDoctorNumber(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="contacto_emergencia">Contacto de Emergencia</label>
            <input
              type="text"
              name="contacto_emergencia"
              className="form-control"
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>
          <div className="form-space input-style">
            <label htmlFor="telefono_contacto">Telefono del Contacto</label>
            <input
              type="tel"
              name="telefono_contacto"
              placeholder="12345678"
              className="form-control"
              onChange={(e) => setEmergencyNumber(e.target.value)}
            />
          </div>
          <div className="form-space">
            <h4>Historial Medico</h4>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={1}
                  id="salud-reciente"
                ></input>
                <label className="form-check-label" for="salud-reciente">
                  Problemas de salud recientes
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={2}
                  id="problemas-cardiacos"
                ></input>
                <label className="form-check-label" for="problemas-cardiacos">
                  Problemas cardiacos
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={3}
                  id="presion-alta"
                ></input>
                <label className="form-check-label" for="presion-altas">
                  Presion alta
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={4}
                  id="presion-baja"
                ></input>
                <label className="form-check-label" for="presion-baja">
                  Presion baja
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={6}
                  id="dificultad-respiracion"
                ></input>
                <label
                  className="form-check-label"
                  for="dificultad-respiracion"
                >
                  Dificultades para respirar
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={7}
                  id="asma"
                ></input>
                <label className="form-check-label" for="asma">
                  Asma
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={8}
                  id="tos-cronica"
                ></input>
                <label className="form-check-label" for="tos-cronica">
                  Tos Cronica
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={9}
                  id="cirugias-recientes"
                ></input>
                <label className="form-check-label" for="cirugias-recientes">
                  Cirugias Recientes
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={10}
                  id="tratamiento-radiacion"
                ></input>
                <label className="form-check-label" for="tratamiento-radiacion">
                  Tratamiento con radiacion
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={11}
                  id="diabetes"
                ></input>
                <label className="form-check-label" for="diabetes">
                  Diabetes
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={12}
                  id="hipoglicemia"
                ></input>
                <label className="form-check-label" for="hipoglicemia">
                  Hipoglicemia
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={13}
                  id="gastritis"
                ></input>
                <label className="form-check-label" for="gastritis">
                  Gastritis
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={14}
                  id="hepatitis"
                ></input>
                <label className="form-check-label" for="hepatitis">
                  Hepatitis
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={15}
                  id="problemas-renales"
                ></input>
                <label className="form-check-label" for="problemas-renales">
                  Problemas Renales
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={16}
                  id="anemia"
                ></input>
                <label className="form-check-label" for="anemia">
                  Anemia
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={18}
                  id="fiebre-reumatica"
                ></input>
                <label className="form-check-label" for="fiebre-reumatica">
                  Fiebre reumatica
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={20}
                  id="excesivo-sangrado"
                ></input>
                <label className="form-check-label" for="excesivo-sangrado">
                  Excesivo sangrado de heridas
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={21}
                  id="alergias"
                ></input>
                <label className="form-check-label" for="alergias">
                  Alergia a antibióticos, penicilina
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={22}
                  id="otras-alergias"
                ></input>
                <label className="form-check-label" for="otras-alergias">
                  Otras alergias
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={23}
                  id="epilepsia"
                ></input>
                <label className="form-check-label" for="epilepsia">
                  Epilepsia
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
            <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={5}
                  id="dolor-pecho"
                ></input>
                <label className="form-check-label" for="dolor-pecho">
                  Dolor en el pecho
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={17}
                  id="artritis"
                ></input>
                <label className="form-check-label" for="artritis">
                  Artritis
                </label>
              </div>
            </div>
          </div>
          <div className="form-space">
            <h4>Historial Dental</h4>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={24}
                  id="Amigdalitis"
                ></input>
                <label className="form-check-label" for="Amigdalitis">
                  Amigdalitis
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={25}
                  id="uso-tabaco"
                ></input>
                <label className="form-check-label" for="uso-tabaco">
                  Uso de tabaco
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={26}
                  id="Sangrado-encias"
                ></input>
                <label className="form-check-label" for="Sangrado-encias">
                  Sangrado de encías
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={28}
                  id="sensibilidad-dental-frio"
                ></input>
                <label
                  className="form-check-label"
                  for="sensibilidad-dental-frio"
                >
                  Sensibilidad dental al frio
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={29}
                  id="sensibilidad-dental-dulces"
                ></input>
                <label
                  className="form-check-label"
                  for="sensibilidad-dental-dulces"
                >
                  Sensibilidad dental a dulces
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={30}
                  id="dolor-masticar"
                ></input>
                <label className="form-check-label" for="dolor-masticar">
                  Dolor al masticar
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={31}
                  id="Bruxismo"
                ></input>
                <label className="form-check-label" for="Bruxismo">
                  Bruxismo, rechina dientes
                </label>
              </div>
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={32}
                  id="dientes-flojos"
                ></input>
                <label className="form-check-label" for="dientes-flojos">
                  Dientes flojos
                </label>
              </div>
            </div>
          </div>
          <div className="form-space container checkboxes">
            <div className="row">
              <div className="col-xl">
                <input
                  className="form-check-input"
                  onChange={addCondition}
                  type="checkbox"
                  value={27}
                  id="empaque-alimenticio"
                ></input>
                <label className="form-check-label" for="empaque-alimenticio">
                  Empaque alimenticio
                </label>
              </div>
            </div>
          </div>
          <div className="form-space boton-align">
            <input
              className = 'boton-formulario'
              type="submit"
              name="submit"
              value="Registrar nuevo paciente"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
