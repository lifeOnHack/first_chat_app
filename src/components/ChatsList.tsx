import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Chat from "./Chat";
import '../css/ChatsList.css'
import { useChats } from "../utils/ChatsContext";

interface chatData {
    chatName: string, imgurl: string|null,id:any
}

export default function ChatsList(
    { sock,chats,activeId, setActive }:
        { sock: Socket,chats:chatData[],activeId:any, setActive:any }
) {
    
    //give each user callback that setActive(his_id)
    //when pass isActive check his id equal to activeId

    return <div className="flex_div chats">
        {chats.map((chat,_i)=>{
            return <Chat name={chat.chatName} 
            imgurl={chat.imgurl? chat.imgurl : 'https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp'} 
            isActive={activeId===chat.id}
            setActive={(e:any)=>{setActive(chat.id)}}></Chat>;
        })}
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
        <Chat name="firstuser" imgurl='https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp' isActive={false} setActive={setActive}></Chat>
    </div>

}
