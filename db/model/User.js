import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
     name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
   
     email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
},
{timestamps:true}
);

const User= mongoose.model("User",UserSchema);

export default User;
