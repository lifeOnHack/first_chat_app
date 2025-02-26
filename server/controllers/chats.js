import express from "express";
import { getChats } from "../lib/db.js";
const chatsRout = express.Router();
chatsRout.get('/:un',async (req,res)=>{
    const username = req.params.un; 
    const dbRes = await getChats(username);
    if (dbRes.status === 201) {
        res.status(dbRes.status).json(dbRes.msg);
    }else{
        res.status(dbRes.status).send({body:dbRes.msg});
    }
});

export default chatsRout;