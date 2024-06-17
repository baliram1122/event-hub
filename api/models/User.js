import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isCommitteMember: {
        type: Boolean,
        default: false
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Assuming your event model is named 'Event'
      }],
    
}, {timestamps: true})

export default mongoose.model("User", UserSchema)