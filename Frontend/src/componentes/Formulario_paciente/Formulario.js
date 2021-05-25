import React, { useState } from 'react';
import './Formulario.scss';
import axios from 'axios';


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function Formulario() {
    const [name, setName] = useState("");
    const [homePhone,setHomePhone] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [civilState, setCivilState] = useState("");
    const [profession, setProfession] = useState("");
    const [address, setAddress] = useState("");
    const [recommendedBy, setRecommendedBy] = useState("");
    const[lastDentistAppointment, setLastDentistAppointment] = useState("");
    const[appointmentReason, setAppointmentReason] = useState("");
    const[personalDoctor, setPersonalDoctor] = useState("");
    const[doctorNumber, setDoctorNumber] = useState("");
    const[emergencyContact, setEmergencyContact] = useState("");
    const[emergencyNumber, setEmergencyNumber] = useState("");

    const handleSubmit = (e) => {
        
        var data = JSON.stringify({
            "nombre": name,
            "telefono_casa": homePhone,
            "telefono_celular": cellPhone,
            "fecha_nacimiento": birthDay,
            "estado_civil": civilState,
            "ocupacion": profession,
            "direccion": address,
            "recomendado_por": recommendedBy,
            "visita_anterior_dentista": formatDate(lastDentistAppointment),
            "motivo_consulta": appointmentReason,
            "medico": personalDoctor,
            "telefono_medico": doctorNumber,
            "contacto_emergencia": emergencyContact,
            "telefono_emergencia": emergencyNumber
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/paciente/addPaciente',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          alert('Nuevo paciente ingresado con exito');
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }


    return (
        <div className='formulario-paciente'>
            <div className='container'>
                <h1>Ficha Nuevo Paciente</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-space">
                        <label htmlFor='nombre'>Nombre</label>
                        <input type="text" name="nombre" className="form-control" onChange={e =>setName(e.target.value)} />
                    </div>
                    <div className="form-space">
                        <label htmlFor='telefono_casa'>Telefono de Casa</label>
                        <input type="tel" name="telefono_casa" placeholder='1234-5678' pattern="[0-9]{4}-[0-9]{4}" className="form-control" onChange={e =>setHomePhone(e.target.value)} />
                    </div>
                    <div className="form-space">
                        <label htmlFor='telefono_celular'>Celular</label>
                        <input type='tel' name='telefono_celular' placeholder='1234-5678' pattern="[0-9]{4}-[0-9]{4}" className="form-control" onChange={e =>setCellPhone(e.target.value)}/>
                    </div>
                    
                    <div className="form-space row">
                        <label htmlFor="example-date-input1" className="col-4 col-form-label">Fecha de nacimiento</label>
                        <div className="col-12">
                            <input className="form-control" type="date"  id="example-date-input1"  onChange={e =>setBirthDay(e.target.value)}/>
                        </div>
                    
                    
                    </div>
                    
                    <div className="form-space"> 
                        <label htmlFor='estado_civil'>Estado Civil</label>
                        <input type='text' name='estado_civil' className='form-control' onChange={e =>setCivilState(e.target.value)}/>
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='ocupacion'>Ocupacion</label>
                        <input type='text' name='ocupacion' className='form-control' onChange={e =>setProfession(e.target.value)}/>
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='direccion'>Direccion</label>
                        <input type='text' name='direccion' className='form-control'  onChange={e =>setAddress(e.target.value)}/>
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='recomendado_por'>Recomendado por</label>
                        <input type='text' name='recomendado_por' className='form-control'  onChange={e =>setRecommendedBy(e.target.value)}/>
                    </div>


                    <div className="form-space row">
                        <label htmlFor="example-date-input2" className="col-4 col-form-label">Ultima visita al Dentista:</label>
                        <div className="col-12">
                            <input className="form-control" placeholder="yyyy-mm-dd" type="date"  id="example-date-input2"  onChange={e =>setLastDentistAppointment(e.target.value)}/>
                        </div>


                        <div className="form-space"> 
                        <label htmlFor='motivo_consulta'>Motivo de consulta</label>
                        <input type='text' name='motivo_consulta' className='form-control'  onChange={e =>setAppointmentReason(e.target.value)}/>
                    </div>
                    </div>

                    <div className="form-space"> 
                        <label htmlFor='doctor_personal'>Doctor personal</label>
                        <input type='text' name='doctor_personal' className='form-control' onChange={e =>setPersonalDoctor(e.target.value)} />
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='telefono_doctor'>Telefono del doctor personal</label>
                        <input type="tel" name="telefono_doctor" placeholder='1234-5678' pattern="[0-9]{4}-[0-9]{4}" className='form-control' onChange={e =>setDoctorNumber(e.target.value)} />
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='contacto_emergencia'>Contacto de Emergencia</label>
                        <input type='text' name='contacto_emergencia' className='form-control'  onChange={e =>setEmergencyContact(e.target.value)} />
                    </div>
                    <div className="form-space"> 
                        <label htmlFor='telefono_contacto'>Telefono del Contacto</label>
                        <input type="tel" name="telefono_contacto" placeholder='1234-5678' pattern="[0-9]{4}-[0-9]{4}" className="form-control" onChange={e =>setEmergencyNumber(e.target.value)} />
                    </div>
                    <div className="form-space boton-formulario"> 
                        <input type="submit" name="submit" value="Registrar nuevo paciente"/>                   
                    </div>

                    
                </form>
            </div>
        </div>
    )
}

export default Formulario;