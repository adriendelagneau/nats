import mongoose from "mongoose";

export interface Users extends mongoose.Schema {
    name: string;
    email: string;
    password?: string;
    image?: string;
    provider: string;
    role: string;
    isSubscribe: boolean
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new mongoose.Schema<Users>({

    name: {
        type: String,
        required: [true, "Please provide a name ."],
        maxlength: [60, "Name cannot be more than 60 characters"],
        minlength: [6, "Name cannot be less than 6 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide name"],
        match: [emailRegex, "Invalid email address."],
    },
    password: {
        type: String,
    },
    image: {
        type: String,
      },
      provider: {
        type: String,
        default: 'credentials',
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user',
        required: true,
    },
    isSubscribe: {
        type: Boolean,
        default: false,
        required: true
    }
      
})

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);

