import React from "react";
import "../css/Signup.css"; 
function Signup(){
    return <>
        <form className="signupF">
            <label>username</label>
            <input type="text" name="username" id="user_id" />
            <br />
            <label>password</label>
            <input type="password" name="pw" id="pw_id" />
            <br />
            <button type="submit" className="done">SIGNUP</button>
        </form>
    </>
}

export default Signup;