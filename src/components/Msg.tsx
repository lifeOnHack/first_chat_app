import "../css/Msg.css"
import React from "react";

function Message({autur,msg,time}:
    {autur:string,msg:string,time:string}){
    return <div className="msg">
        <label className="autur"><strong>{autur}</strong>:</label>
        <p className="data">{msg}</p>
        <label className="date">{time}</label>
    </div>
}
export default Message;
