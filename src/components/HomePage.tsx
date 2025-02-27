import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import MsgPage from "./MsgPage";
import Disconnect from "./Disconnect";
import '../css/HomePage.css'
import ChatsList from "./ChatsList";
import { useChats } from "../utils/ChatsContext";
import { io } from 'socket.io-client';

export default function HomePage({ user, setIsSignedIn }:
    { user: string, setIsSignedIn: any }) {
    const chatUrl = "http://localhost:7070/chat"
    const [sock, setSocket] = useState(io("ws://localhost:7070"));
    const { chats, setChats } = useChats();
    const  [chatsData,setChatsData] = useState([]);
    const [activeChatId,setActiveChatId] = useState(null);
    useEffect(() => {
        //fetch all users OR
        //fetch all friends
        fetch(chatUrl+'/'+user,{
            method:"GET",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(async (res)=>{
            const data = await res.json();
            if (res.status === 201) {
                setChatsData(data);
            } else {
                alert("get chatData faild with status: " + res.status + `\n${data.body}`);
            }
        }).catch((err) => {
            alert("request chat list failed");
            console.log(err);
        })
    }, [chats]);
    return <div className="home">
        <ChatsList sock={sock} chats={chatsData} 
        activeId={activeChatId} setActive={setActiveChatId}></ChatsList>
        <MsgPage user={user} sock={sock} chatId={activeChatId}></MsgPage>
        <Disconnect discon={() => setIsSignedIn(false)}></Disconnect>
    </div>
}