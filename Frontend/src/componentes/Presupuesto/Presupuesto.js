import { height } from 'dom-helpers';
import React from 'react';
import Logo from '../../assets/FULL_COLOR.png';
//import './presupuesto.css';
function Presupuesto({nombre, doctor, total, summary}) {
    return (
        <div className='print-source'>
            <div id="presupuesto-paciente">
            {/*create presupuesto view with Logo at the top */}

            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-2">
                        <img src={Logo} alt="Logo" className="img-fluid" width={500} />
                    </div>
                </div>
            </div>

            {/*create centered h1 title*/}
            <div className="container mb-4">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center">Presupuesto odontologico</h2>
                    </div>
                </div>
            </div>

            {/*create container that displays the date, patient name, email and doctors name */}

            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    <strong>Fecha: </strong>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </p>
                                <p className="card-text">
                                    <strong>Nombre: </strong>
                                    <span>{nombre}</span>
                                </p>
                                <p className="card-text">
                                    <strong>Email: </strong>
                                    <span>{'dentalesgt@gmail.com'}</span>
                                </p>
                                <p className="card-text">
                                    <strong>Odontologo: </strong>
                                    <span>{doctor}</span>
                                </p>
                                <p className="card-text">
                                    <strong>Numero: </strong>
                                    <span>{'45778581'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                {/* <h5 className="card-title">
                                    <strong>Descripcion del tratamiento</strong>
                                </h5>
                                <p className="card-text">

                                    <strong>Tratamiento: </strong>
                                    <span>{'Tratamiento de dientes'}</span>
                                </p>
                                <p className="card-text">
                                    <strong>Descripcion: </strong>
                                    <span>{'Tratamiento de dientes'}</span>
                                </p> */}
                                <div className='container'>
                                    <div className='row align-items-center'>
                                    <div className='col-8 text-center'>
                                            <h5 className="card-title">
                                                <strong>Presupuesto</strong>
                                            </h5>
                                        </div>
                                        <div className='d-flex flex-column col-4'>
                                        <div class="p-2"><strong>Total:</strong></div>
                                        <div class="p-2">{'Q'+total}</div>
                                        </div>
                                    </div>

                                </div>

                            
                                </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Procedimiento</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.map((row, index) => (
                                    <tr
                                        key={index} >
                                        <td>{row.procedimiento}</td>
                                        <td>{'Q'+row.precio}</td>
                                        <td>{row.cantidad}</td>
                                        <td>{'Q'+row.total}</td>
                                    </tr>
                                ))}
                                
                                
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*Sign from doctor and from patient */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col text-center">
                    <div className="row">
                        <p>{'_____________________________________'}</p>
                        <p className="card-text">
                                    Firma paciente
                                </p>
                            
                        </div>
                    
                    </div>
                    <div className="col text-center">
                        
                        
                        <div className="row">
                        <p>{'_____________________________________'}</p>
                        <p className="card-text">
                                    Firma odontologo
                                </p>
                            
                        </div>
                    
                    </div>
                    </div>
                </div>

            

            </div></div>
    )
}

export default Presupuesto
