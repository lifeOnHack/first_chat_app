import React from "react";
import "../css/Chat.css"

export default function Chat(
    { name, imgurl, isActive,setActive }: { name: string, imgurl: string, isActive: boolean,setActive:any }
) {
    const maxNameLen = 20;
    const switchToChat = (e: any) => {
        //switch to that that
        //load the conversition
        setActive();
        alert("not impl");
    }
    const fixName = (name: string) => {
        if (name.length > maxNameLen) {
            return name.slice(0, 17) + "...";
        }
        return name;
    }

    return <div className={isActive ? "conv active" : "conv"} onClick={switchToChat}>
        <img src={imgurl} alt="profiel" className="profielPhoto" />
        <label className="name">{fixName(name)}</label>
    </div>
}