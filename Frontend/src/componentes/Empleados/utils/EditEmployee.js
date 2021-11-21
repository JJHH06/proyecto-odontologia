import React, {useState, useEffect} from 'react'

function EditEmployee({token, currentEmployee, setCurrentEmployee}) {

    const [emailInput, setEmailInput] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [typeInput, setTypeInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    return (
        
        <>
            {/*component to add new employee */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Editar Empleado</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Correo Electronico</label>
                                        <input type="email" className="form-control" placeholder="Correo electrónico" value={''} />
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" value={''} />
                                    </div>
                                    <div className="form-group">
                                        <label>tipo</label>
                                        <input type="text" className="form-control" placeholder="Tipo" value={''} />
                                    </div>
                                    <div className="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Contraseña" value={''} />
                                    </div>
                                
                                    <button type="submit" className="btn btn-primary" >Editar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditEmployee
