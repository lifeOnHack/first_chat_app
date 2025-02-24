import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Chat from "./Chat";
import '../css/ChatsList.css'

interface chatData {
    name: string, imgurl: string
}

export default function ChatsList(
    { sock }:
        { sock: Socket }
) {
    const [chatList, setChats] = useState([]);
    const [activeChat, setActive] = useState("");
    //give each user callback that setActive(his_name)
    //when pass isActive check his name equal to activeUser
    useEffect(() => {
        //fetch all users OR
        //fetch all friends
    }, []);

    return <div className="flex_div chats">
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false}></Chat>
    </div>

}
