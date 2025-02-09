import React, { useRef, useState } from "react";
import Msg from "./Msg"
import '../css/MsgPage.css'

export interface msgData {
    author: string,
    msg: string,
    time: string
}

function MsgPage({ msgList }:
    { msgList: msgData[] }) {
    const [msgs, setMsgs] = useState<msgData[]>(msgList);
    const [newmsg, setNewMsg] = useState("");
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    return <div className="chat">
        <div className="msg-list">
            {msgs.map((m, i) => {
                return <Msg autur={m.author} msg={m.msg} time={m.time}></Msg>;
            })}
        </div>
        <br />
        <div className="input-msg">
            <textarea placeholder="type your message.."
                ref={textInputRef}
                onChange={e => {
                    setNewMsg(e.target.value);
                    if (textInputRef.current) {
                        textInputRef.current.style.height = "auto"; // Reset height
                        textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`; // Set to scroll height
                    }
                }}
                value={newmsg}
            />
            <button onClick={(e) => {
                //TODO: send msg to server
            }}>
                <img alt="send" src="https://static-00.iconduck.com/assets.00/send-icon-1024x1011-38wtwa0n.png"></img>
            </button>
        </div>
    </div>
}

export default MsgPage;