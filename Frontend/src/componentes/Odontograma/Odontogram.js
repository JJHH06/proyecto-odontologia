import React from 'react'
import Tooth from './Tooth'
function Odontogram() {
    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className="col">
                        <Tooth tooth_id = {1}/>
                    </div>
                    <div className="col">
                        <Tooth tooth_id = {1}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Odontogram
