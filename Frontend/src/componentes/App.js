import React from 'react';
import Login from './Login/Login';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Homescreen from './Homescreen/Homescreen';

class App extends React.Component{
    render(){
        return(
            <div className='app'>
                <Homescreen/>
            </div>
        );
    }
}

export default App