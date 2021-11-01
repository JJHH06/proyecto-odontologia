import React, {useState} from 'react';
import Login from './Login/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Homescreen from './Homescreen/Homescreen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Search from './Searchbar/Search';
import Formulario from './Formulario_paciente/Formulario';
import useToken from './useToken';
import Agenda from './Agenda/Agenda';
import Ficha from './FichaPaciente/Ficha';
import Inventario from './Inventario/Inventario2';
import AddProducto from './AddProduct/AddProduct';
import Empleados from './Empleados/Empleados';
function App(){

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }


    return(
        <div className='app'>
            <BrowserRouter>
            <Navbar/>
                <Switch>
                    <Route path="/informacion_pacientes">
                        <Search/>
                    </Route>
                    <Route path="/ingresar_paciente">
                        <Formulario/>
                    </Route>
                    <Route path="/agenda">
                        <Agenda/>
                    </Route>
                    <Route path="/ficha">
                        <Ficha/>
                    </Route>
                    <Route path="/inventario">
                        <Inventario/>
                    </Route>
                    <Route path="/nuevo_producto">
                        <AddProducto/>
                    </Route>
                    <Route path="/Empleados">
                        <Empleados/>
                    </Route>
                    <Route path="/">

                    </Route>
                    
                </Switch>
            </BrowserRouter>
        </div>
        );
    
}

export default App