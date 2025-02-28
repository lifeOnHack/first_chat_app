import React, { useEffect, useState } from "react";
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
    const { chats } = useChats();
    const  [chatsData,setChatsData] = useState<any>([]);
    const [activeChatId,setActiveChatId] = useState(null);
    
    useEffect(()=>{
        sock.emit('register',user);
        sock.on('new_chat',(newChat)=>{
            setChatsData(chatsData.concat([newChat]));
        });
    },[]);

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
        <div className="side">
            <ChatsList sock={sock} chats={chatsData} 
            activeId={activeChatId} setActive={setActiveChatId}></ChatsList>
            <Disconnect discon={() => setIsSignedIn(false)}></Disconnect>
        </div>
        <MsgPage user={user} sock={sock} chatId={activeChatId}></MsgPage>
    </div>
}