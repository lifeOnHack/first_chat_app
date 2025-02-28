import express from "express";
import { createChat, getChats } from "../lib/db.js";
import { getIo, getSockId } from "../lib/io.js"; // Import getIo
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
chatsRout.post('/new',async (req,res)=>{
    const chatName = req.body.chat;
    const imgurl = req.body.imgurl;
    const usersList = req.body.users;
    const dbRes = await createChat(chatName,imgurl,usersList);
    if (dbRes.status === 201) {
        //return ok and send update in IO
        usersList.forEach(user => {
            const id = getSockId(user);
            if (id) {
                getIo().to(id).emit("new_chat", dbRes.msg);
            }
        });
        res.sendStatus(dbRes.status);
    }else{
        //return error to user
        res.status(dbRes.status).send(dbRes.msg);
    }
})

export default chatsRout;