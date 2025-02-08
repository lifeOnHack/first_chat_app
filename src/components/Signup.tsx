import React, { FormEvent, useState } from "react";
import "../css/Signup.css";
function Signup({ setSigned }: any) {
    const loginUrl = "http://localhost:7070/signup"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const signup = (e: FormEvent) => {
        e.preventDefault();
        fetch(loginUrl, {
            "method": "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(async (res) => {
            if (res.status === 200) {
                const data = await res.json();
                alert("user " + username + " signedup");
                //TODO: tell father that user logedin
                // switch fages
                setSigned(true);
                console.log("yesss");
                alert(data.data + " xd")
            } else {
                alert("signup faild with status: " + res.status);
            }
        }).catch((err) => {
            alert("request failed xoxo");
            console.log(err);
        })
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