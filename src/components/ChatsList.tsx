import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Chat from "./Chat";
import '../css/ChatsList.css'
import { useChats } from "../utils/ChatsContext";

interface chatData {
    chatName: string, imgurl: string,id:any
}

export default function ChatsList(
    { sock,chats }:
        { sock: Socket,chats:chatData[] }
) {
    
    const [activeChat, setActive] = useState("");
    //give each user callback that setActive(his_name)
    //when pass isActive check his name equal to activeUser

    return <div className="flex_div chats">
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
    </div>

}
