import "../css/Msg.css"
import React from "react";

function Message({author,msg,time}:
    {author:string,msg:string,time:string}){
    return <div className="msg">
        <label className="autur"><strong>{author}</strong>:</label>
        <p className="data">{msg}</p>
        <label className="date">{time}</label>
    </div>
}
export default Message;
