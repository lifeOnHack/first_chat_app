import express from "express";
import { newMsg, getAllMsgs } from "../lib/db.js";
const messageRout = express.Router();

messageRout.get("/", async (req, res) => {
    const dbRes = await getAllMsgs();
    if (dbRes) {
        res.status(201).json(dbRes);
    }else{
        res.sendStatus(402);
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