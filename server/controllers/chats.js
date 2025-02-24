import express from "express";
const chatsRout = express.Router();
import { getChats } from "../lib/db";

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