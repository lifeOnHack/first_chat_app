import express from "express";
import { signUser } from "../lib/db.js";
const signupRout = express.Router();


signupRout.post("/", async (req, res) => {
    //TODO: add DB check
    console.log(req.body);
    const dbRes = await signUser(req.body.username, req.body.password);
    res.status(dbRes.status).send({ body: dbRes.msg });
    //TODO: if username/password alreay used return 500 
})


export default signupRout;