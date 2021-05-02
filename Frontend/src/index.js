import React from 'react';
import ReactDom from 'react-dom';
import Login from './Login/Login'

class App extends React.Component{
    render(){
        return(
            <div className='app'>
                <Login/>
            </div>
        );
    }
}

ReactDom.render(<App></App>, document.getElementById('root'));