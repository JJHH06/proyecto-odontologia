import React, {useState} from 'react';
import Login from './Login/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Homescreen from './Homescreen/Homescreen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
                        <Homescreen />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        );
    
}

export default App