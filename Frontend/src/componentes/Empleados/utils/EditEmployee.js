import axios from 'axios'
import React, {useState, useEffect} from 'react'



function EditEmployee({token, currentEmployee, setCurrentEmployee}) {

    const [emailInput, setEmailInput] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [typeInput, setTypeInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [loading, setLoading] = useState(true)
    


    const getPatient = async () => {
        const data = JSON.stringify({
            "id_empleado": currentEmployee.id
          });
          
          var config = {
            method: 'post',
            url: 'http://198.211.103.50:5000/api/empleado/getEmpleado',
            headers: { 
              'Authorization': 'Bearer  '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
    
          return await axios(config)
            .then(function (response) {
                setEmailInput(response.data.result.id_empleado)
                setNameInput(response.data.result.nombre)
                setTypeInput(response.data.result.tipo)
                console.log(response.data.result.result)
                return response.data.result
            })      
          
    }

    const updatePatient = async () => {
        const data = JSON.stringify({
            "id_empleado": currentEmployee.id,
            "password": passwordInput,
            "nombre": nameInput,
            "email": emailInput,
            "tipo": typeInput
          });
          
          let config = {
            method: 'put',
            url: 'http://198.211.103.50:5000/api/empleado/updateEmpleado',
            headers: { 
              'Authorization': 'Bearer  '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          return await axios(config)
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            console.log(error)
          }
            )
    }

    const addPatient = async () => {
        const data = JSON.stringify({
            "id_empleado": emailInput,
            "password": passwordInput,
            "nombre": nameInput,
            "email": emailInput,
            "tipo": typeInput
          });
          
          let config = {
            method: 'post',
            url: 'http://198.211.103.50:5000/api/empleado/addEmpleado',
            headers: { 
              'Authorization': 'Bearer  '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          return await axios(config)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    useEffect(async () => {
        setLoading(true)
        if (currentEmployee.id) {

            
            const datos = await getPatient()
        }
        setLoading(false)
    }, [])



    
    return (
        
            <>{loading ? <div>Loading...</div> :
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className='mx-auto'>{currentEmployee.id?'Editar Empleado':'Agregar nuevo empleado'}</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={async (e)=>{
                                    e.preventDefault();
                                    //validate that passwordInput is at least 8 characters long
                                    if (passwordInput.length < 8) {
                                        alert('La contraseña debe tener al menos 8 caracteres')
                                        return
                                    }
                                    if (currentEmployee.id){
                                        await updatePatient()
                                    }
                                    else{
                                        await addPatient()
                                    }
                                    setCurrentEmployee({isEdit:false})
                                    return
                                    
                                }}>
                                    <div className="form-group p-2">
                                        <label>Correo Electronico</label>
                                        <input type="email" className="form-control" placeholder="Correo electrónico" value={emailInput} onChange={(e)=>{
                                            setEmailInput(e.target.value)
                                        }} />
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" value={nameInput} onChange={(e)=>{
                                            setNameInput(e.target.value)
                                        }}/>
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Tipo</label>
                                        <input type="text" className="form-control" placeholder="Tipo" value={typeInput} onChange={(e)=>{
                                            setTypeInput(e.target.value)
                                        }}/>
                                    </div>
                                    <div className="form-group p-2">
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Contraseña" value={passwordInput} onChange={(e)=>{
                                            setPasswordInput(e.target.value)
                                        }}/>
                                    </div>
                                
                                    
                                    <div className="row diagnosis-button-separator">
          <div className=" save-diagnosis-button col-md-6">
            <button type="button" onClick={()=>{
                setCurrentEmployee({isEdit:false});
            }} className="btn btn-danger" >Cancelar</button>
          </div>
          <div className="save-diagnosis-button col-md-6">
            <button type="submit" className="btn btn-primary" >{currentEmployee.id?'Editar':'Guardar'}</button>
          </div>
        </div>
                                    

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}</>
        
    )
}

export default EditEmployee
