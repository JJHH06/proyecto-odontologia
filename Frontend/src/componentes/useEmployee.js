import { useState } from 'react';

export default function useEmployee(){
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('use_employee');
        const userToken = JSON.parse(tokenString);
        

        return userToken
    };

    const [currentUser, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('use_employee', JSON.stringify(userToken));
        setToken(userToken);
    };
    
    return{
        setCurrentUser:saveToken,
        currentUser
    }

}