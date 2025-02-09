import React from "react";
import '../css/Disconnect.css'
function Disconnect({ discon }: any) {

    //TODO: add socket disconnection
    return <>
        <button className="discon" onClick={discon}>Bye Bye!</button>
    </>
}

export default Disconnect;