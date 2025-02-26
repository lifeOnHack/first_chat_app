import express from "express";
import { signUser } from "../lib/db.js";
const signupRout = express.Router();


signupRout.post("/", async (req, res) => {
    //console.log(req.body);
    const dbRes = await signUser(req.body.username, req.body.password);
    res.status(dbRes.status).json({ body: dbRes.msg });
})


export default signupRout;