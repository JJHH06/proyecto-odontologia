import React  from 'react';
import './Main.css';
import './App.css';
import {Button} from './Button';

function Main(){
    return (
        <div className='main-container'>
            <image src="/logo512.png"/>
            <h1>TEXTO AQUI</h1>
            <p>TEXTO 2 AQUI</p>
        <div className="main-btns">
            <Button className='btns' buttonStyle='btn--outline' 
            buttonSize='btn--large'>
                GET STARTED
            </Button>
            <Button className='btns' buttonStyle='btn--primary' 
            buttonSize='btn--large'>
                WATCH THIS
            </Button>
        </div>
        </div>
    )
}
export default Main