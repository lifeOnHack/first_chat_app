import React from "react";
import '../css/Disconnect.css'
function Disconnect({ discon }: any) {

    //add socket disconnection - already in discon
    return <>
        <button className="discon" onClick={discon}>Bye Bye!</button>
    </>
}

export default Disconnect;