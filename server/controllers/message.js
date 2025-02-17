import express from "express";
import { newMsg, getAllMsgs } from "../lib/db";
const messageRout = express.Router();

messageRout.get("/", async (req, res) => {

})
messageRout.post("/", async (req, res) => {
    const dbRes = await newMsg(
        req.body.author,
        req.body.msg,
        req.body.date);
        res.status(dbRes).send();
})

export default messageRout;