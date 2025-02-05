import React, { FormEvent, useState } from "react";
import "../css/Signup.css";
function Signup() {
    const serverUrl = "http://localhost:7070/login"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const signup = (e: FormEvent) => {
        e.preventDefault();
        fetch("")
    }

    return <>
        <form className="signupF" onSubmit={signup}>
            <label>username</label>
            <input type="text" name="username" id="user_id" onChange={(e) => {
                setUsername(e.target.value);
            }} />
            <br />
            <label>password</label>
            <input type="password" name="pw" id="pw_id" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <br />
            <button type="submit" className="done">SIGNUP</button>
        </form>
    </>
}

export default Signup;