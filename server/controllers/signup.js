import express from "express";
const signupRout = express.Router();


signupRout.post("/", async (req, res) => {
    //TODO: add DB check
    console.log(req.body);
    res.status(200).send({ data: "user registered!" });
    //TODO: if username/password alreay used return 500 
})


export default signupRout;