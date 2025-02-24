import express from "express";
import { newMsg, getAllMsgs, getChatMsgs } from "../lib/db.js";
const messageRout = express.Router();

messageRout.get("/", async (req, res) => {
    const dbRes = await getAllMsgs();
    if (dbRes) {
        res.status(201).json(dbRes);
    }else{
        res.sendStatus(402);
    }
})
messageRout.get('/:id', async (req, res)=>{
    const groupId = req.params.id;
    const dbRes = getChatMsgs(groupId);
    if (dbRes.status === 201) {
        res.status(dbRes.status).json(dbRes.msg);
    }else{
        res.status(dbRes.status).send({body:dbRes.msg});
    }
})

messageRout.post("/", async (req, res) => {
    const dbRes = await newMsg(
        req.body.author,
        req.body.msg,
        req.body.date);
        res.status(dbRes).send();
})

export default messageRout;