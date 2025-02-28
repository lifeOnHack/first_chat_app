import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('db connected');
    } catch (error) {
        console.log("unable to connect to DB");
        console.log(error);
    }

}
//USER SCHEMA
const userSchem = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});
userSchem.set("versionKey", false);
export const User = mongoose.model('User', userSchem);
export const signUser = async (uName, pw) => {
    try {
        const userRes = await User.findOne({ username: uName });
        const saltRounds = 12;
        if (userRes === null) {
            // new user
            const hashPw = await bcrypt.hash(pw, saltRounds);
            // save new user
            const newUser = new User({ username: uName, password: hashPw, chats:[] });
            if (newUser) {
                await newUser.save();
                // TODO:return ok --- later on generate jkw
                return { status: 200, msg: {txt:"new user created",chats:[]} }
            } else {
                //return user error
                return { status: 401, msg: "ERR: can't creat user" };
            }

        } else if (await bcrypt.compare(pw, userRes.password)) {
            //user singed
            return { status: 200, msg: {txt:"user logedin",chats:userRes.chats}};
        } else {
            //user already exists
            return { status: 401, msg: "ERR: username used" };
        }
    } catch (error) {
        console.log(error);
        return { status: 500, msg: error };
    }
}
export const getUsersByChatId = async (chatId) => {
    try {
        const users = await User.find({ chats: chatId });
        console.log("Users in chat:", users);
        return users;
    } catch (err) {
        console.error("Error fetching users:", err);
        return null;
    }
};
export async function getUserByFilter(fltr){
    try {
        const user = await User.findOne(fltr);
        return user;
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
}

// CHAT SCHEMA
const chatSchema = new mongoose.Schema({
    isGroup: { type: Boolean, default: false },  // Group chat indicator
    chatName: { type: String, default: '' },  // Group name (if it's a group chat)
    imgurl:{type:String,default:null}
  });
chatSchema.set("versionKey", false);
chatSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.isGroup;
        return ret;
    },
})

const Chat = mongoose.model("Chat", chatSchema);

export const getChats = async (un)=>{
    try {
        const user = await User.findOne({username:un})
          .select('chats')  // Only fetch the chats field
          .populate({
            path: 'chats',
            select: '_id chatName imgurl'  // Only populate _id, chatName and imgurl
          });
    
        if (!user) {
          console.log('User not found');
          return {status:404, msg:'User not found'};
        }
    
        //console.log('Chats for user:', user.chats);
        return {status:201, msg:user.chats} ;  // Returns an array of objects with _id and chatName
      } catch (err) {
        console.error('Error retrieving chats:', err);
        return {status:401, msg:"ERR: can't get chats"} ;
      }
}

export const createChat = async (name,imgurl,users)=>{
    try {
        const newChat = new Chat({chatName:name, imgurl});
        const res = await newChat.save();
        if (res) {
            users.forEach((user,i) => {
                User.updateOne({username:user},{$pull:{chats:res._id}})
            });
            return {status:201, msg:res.toJSON()};
        }
        return {status:500, msg:"can't creat chat"};
    } catch (error) {
        return {status:402, msg:"can't save chat "+error};
    }
}

// MESSAGE SCHEMA
const msgSchem = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    author: { type: String, require: true },
    msg: { type: String, require: true },
    date: { type: String, require: true }
})
msgSchem.set("versionKey", false);
msgSchem.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id;     // Remove _id
        ret.time = ret.date;
        delete ret.date;
        delete ret.chat;
        return ret;
    },
});

const Msg = mongoose.model("Msg", msgSchem);

export const getAllMsgs = async () => {
    const res = await Msg.find({});
    return res;
}

export const newMsg = async (author, msg, date,chat) => {
    const nMsg = new Msg({ author, msg, date,chat });
    if (nMsg) {
        await nMsg.save();
        return { status: 200, msg: "" }
    } else {
        //return msg error
        return { status: 402, msg: "ERR: can't save msg" };
    }
}
export const getChatMsgs = async (id)=>{
    try {
        const msgList = await Msg.find({chat:id}).populate('author','msg','date');
        if (!msgList) {
            return {status:404,msg:"can't fetch msgs"};
        }else {return {status:201, msg:msgList};}
    } catch (error) {
        console.error('Error retrieving chats:', error);
        return {status:500, msg: "ERR:: can't get chats"};
    }
}


