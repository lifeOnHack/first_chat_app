import React from "react";
import { Socket } from "socket.io-client";
import MsgPage from "./MsgPage";
import Disconnect from "./Disconnect";
import '../css/HomePage.css'


export default function HomePage({ user, sock, setIsSignedIn }:
    { user: string, sock: Socket | null, setIsSignedIn:any }) {
    

    return <div className="home">
        <MsgPage user={user} sock={sock}></MsgPage>
        <Disconnect discon={() => setIsSignedIn(false)}></Disconnect>
    </div>
}