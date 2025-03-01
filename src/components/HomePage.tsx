import React, { useCallback, useEffect, useState } from "react";
import MsgPage from "./MsgPage";
import Disconnect from "./Disconnect";
import '../css/HomePage.css'
import ChatsList from "./ChatsList";
import NewChatForm from "./NewChatForm";
import { useChats } from "../utils/ChatsContext";
import { io } from 'socket.io-client';

export default function HomePage({ user, setIsSignedIn }:
    { user: string, setIsSignedIn: any }) {
    const chatUrl = "http://localhost:7070/chat"
    const [sock, setSocket] = useState(io("ws://localhost:7070"));
    const { chats } = useChats();
    const [chatsData, setChatsData] = useState<any>([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [isOpen, setOpen] = useState(true);
    useEffect(() => {
        //sock.emit('register', user);
        sock.on("connect", () => {
            sock.emit('register', user);
        })
        //return () => { sock.disconnect() }
    }, []);

    useEffect(() => {
        const f = (newChat: any) => {
            setChatsData(chatsData.concat([newChat]));
            sock.emit("sign_chat", newChat.id);
        }
        sock.on('new_chat', f);
        return () => { sock.off('new_chat', f); }
    }, [chatsData]);

    useEffect(() => {
        //fetch all users OR
        //fetch all friends
        fetch(chatUrl + '/' + user, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(async (res) => {
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

    const creatChat = useCallback((chat: string, imgurl: string, users: [string]) => {
        fetch(chatUrl + '/new', {
            "method": "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                chat, imgurl, users
            })
        }).then(async (res) => {
            if (res.status !== 201) {
                alert(`ERR: ${res.status}- ${res.statusText}`);
            } else {
                alert(`${chat} created`);
            }
        }).catch((err) => {
            alert("err new chat");
            console.log(err);
        })
    }, []);

    return <>
        {isOpen && <NewChatForm user={user} close={() => { setOpen(false); }} creat={creatChat} ></NewChatForm>}
        <div className={`home ${isOpen ? 'disabled' : ''}`}>
            <div className="side">
                <ChatsList sock={sock} chats={chatsData}
                    activeId={activeChatId} setActive={setActiveChatId}></ChatsList>
                <Disconnect discon={() => {
                    setIsSignedIn(false);
                    sock.disconnect();
                }}></Disconnect>
            </div>
            <MsgPage user={user} sock={sock} chatId={activeChatId}></MsgPage>
        </div>
    </>
}