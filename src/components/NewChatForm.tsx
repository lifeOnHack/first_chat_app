import React, { useState } from "react";
import "../css/NewChatForm.css";

export default function NewChatForm(
    { user, close, creat }:
        { user: string, close: any, creat: any }) {

    const [name, setName] = useState('');
    const [users, setUsers] = useState([user]);
    const [cur, setCur] = useState('');
    return <div className="new_chat">
        <input type="text" className="inptxt" placeholder="group name:"
            value={name} onChange={(e) => { setName(e.target.value) }} />
        <div className="u_list">
            <input type="text" className="inptxt" placeholder="group users:"
                value={cur} onChange={(e) => { setCur(e.target.value) }} />
            <button className="btn_des add_btn" onClick={e => {
                if (cur.trim() !== '') {
                    setUsers([...users, cur.trim()]);
                }
                setCur("");

            }}>
                <img className="shrink" src="https://banner2.cleanpng.com/20180329/kje/avii4w1qk.webp" alt="+" />
            </button>
        </div>
        <div className="ops">
            <button className="op btn_des" onClick={
                (e) => {
                    //fetch request
                    creat(name, null, users);
                    //close
                    setCur('');
                    setName("");
                    setUsers([user]);
                    //close();
                }
            }>create</button>
            <button className="op btn_des" onClick={
                (e) => {
                    close();
                }
            }>cancle</button>
        </div>
    </div>
}