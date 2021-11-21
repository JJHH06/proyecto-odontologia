import React from 'react'

function Row({index, id, nombre, tipo, setCurrentEmployee}) {
    const handleClick = () => {
        setCurrentEmployee({isEdit:true, id: id});
    }
    return (
        <tr key={index} onClick={handleClick}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{tipo}</td>
        </tr>
    )
}

export default Row
