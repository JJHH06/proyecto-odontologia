import React, {useState, useEffect} from 'react';
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
import Tratamiento from './Tratamiento/Tratamiento';
import Home from './Home/Home';
import Error404 from './Pagina404/Error404';
import Inventario2 from './Inventario/Inventario3';
import useEmployee from './useEmployee';

function App(){

    const { token, setToken } = useToken();
    const { currentUser, setCurrentUser } = useEmployee();
    
    if(!token) {
        
        return <BrowserRouter><Login setToken={setToken} setCurrentUser={setCurrentUser} /></BrowserRouter>
    }
    

    return(
        <div className='app'>
            
            <BrowserRouter>
            <Navbar currentUser={currentUser} setToken={setToken}/>
                <Switch>
                
                <Route path="/informacion_pacientes">
                        <Search token = {token}/>
                    </Route>
                    <Route path="/home">
                        <Homescreen currentUser={currentUser}/>
                    </Route>
                    <Route path="/ingresar_paciente">
                        <Formulario token = {token}/>
                    </Route>
                    <Route path="/agenda">
                        <Agenda token = {token}/>
                    </Route>
                    <Route path="/ficha">
                        <Ficha token = {token} currentUserName={currentUser.nombre}/>
                    </Route>
                    <Route path="/inventario">
                        <Inventario2 token = {token}/>
                    </Route>
                    <Route path="/nuevo_producto">
                        <AddProducto token = {token}/>
                    </Route>
                    
                    { currentUser?.tipo === 'Administrador'?
                    <Route  path="/Empleados">
                        <Empleados token = {token}/>
                    </Route>
                    

                    
                    :null}

                    { currentUser?.tipo === 'Administrador'?
                    
                    <Route  path="/Tratamiento">
                        <Tratamiento token = {token}/>
                    </Route>
                    
                    :null}

                    

<Route path="/">
<Error404/>
</Route>
                    
                    
                    
                    
                </Switch>
            </BrowserRouter>

        </div>
        
        );
    
}

export default App