import React, { useEffect, useRef, useState } from "react";
import Msg from "./Msg"
import '../css/MsgPage.css'
import { Socket } from "socket.io-client";
import { getTime } from "../utils/func";
export interface msgData {
    author: string,
    msg: string,
    time: string
}

function MsgPage({ user, sock, chatId }:
    { user: string, sock: Socket | null,chatId:any }) {
    const msgUrl = "http://localhost:7070/message"
    const [msgs, setMsgs] = useState<msgData[]>([]);
    const [newmsg, setNewMsg] = useState("");
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    const msgListRef = useRef<HTMLDivElement>(null);
    sock?.on("recv_msg", (data) => {
        if (data === null) {
            console.log("can't saved msg");
        }else{
            setMsgs(msgs.concat([data]));
        }
    });

    const sendMsg = (e: any) => {
        if (sock && newmsg.replace(/\s+/g, "") !== "") {
            sock.emit('new_msg', { author: user, msg: newmsg, time: getTime() });
            setNewMsg("");
        }
    }
    useEffect(()=>{
        //TODO need to update
        // get only messages for chatId
        if (chatId!=null) {
        fetch(msgUrl+`/${chatId}`, {
                "method": "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(async (res)=>{
                const data = await res.json();
                if (res.status === 201) {
                    setMsgs(data);
                }else{
                    console.log('fail to get msgs');
                }
            })
        }
    },[chatId]);
    useEffect(() => {
        if (msgListRef.current) {
            msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
        }
    }, [msgs])

    return <div className="chat">
        <div className="msg-list" ref={msgListRef}>
            {msgs.map((m, i) => {
                return <Msg author={m.author} msg={m.msg} time={m.time}></Msg>;
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
            <button onClick={sendMsg}>
                <img alt="send" src="https://static-00.iconduck.com/assets.00/send-icon-1024x1011-38wtwa0n.png"></img>
            </button>
        </div>
    </div>
}

export default MsgPage;