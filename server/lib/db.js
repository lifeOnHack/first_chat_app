import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log("unable to connect to DB");
        console.log(error);
    }

}
const userSchem = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
});

const User = mongoose.model('User', userSchem);
export const signUser = async (uName, pw) => {
    const userRes = await User.findOne({ username: uName });
    const saltRounds = 12;
    if (userRes === null) {
        // new user
        const hashPw = await bcrypt.hash(pw, saltRounds);
        // save new user
        const newUser = new User({ username: uName, password: hashPw });
        if (newUser) {
            await newUser.save();
            // TODO:return ok --- later on generate jkw
            return { status: 200, msg: "new user created" }
        } else {
            //return user error
            return { status: 401, msg: "ERR: can't creat user" };
        }

    } else if (await bcrypt.compare(pw, userRes.password)) {
        //user singed
        return { status: 200, msg: "user logedin" };
    } else {
        //user already exists
        return { status: 401, msg: "ERR: username used" };
    }
    // const passRes = await User.findOne({password:pw});
    // if (userRes === null && passRes === null) {
    //     //new user
    //     //TODO: save new user
    // }else if(userRes === null || passRes === null){
    //     //user exists
    //     //TODO return error uname or password in use
    // }
    // else if(userRes?.id === passRes?.id){
    //     //signed user
    //     //TODO: return ok
    // }
}