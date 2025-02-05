import express from "express";
const signupRout = express.Router();


signupRout.post("/", async (req, res) => {
    console.log(req.body);
})


export default signupRout;