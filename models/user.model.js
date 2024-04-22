import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:{  
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    avtar:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDohX4qAelLzi3t8vCfqccDFxifY-huxkmRrgnSRoig&s",
    },
}, 
    {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
