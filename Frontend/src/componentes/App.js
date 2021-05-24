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

function App(){
    const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />;
    }
    
    return(
        <div className='app'>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <Navbar />
                        <Search/>
                    </Route>
                    <Route path="/Ingresar_Paciente">
                        <Navbar/>
                        <Formulario/>
                    </Route>
                    <Route path="/Informacion_Pacientes">
                        <Navbar/>
                        <Search/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        );
    
}

export default App