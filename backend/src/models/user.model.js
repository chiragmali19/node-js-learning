import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            maxlength: 30,
            minlength: 3,
        },

        password: {
            type: String,
            required: true, 
            minlength: 6,
        },

        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            
        },

    },
    {
        timestamps: true,
    }
);

// before saving any password to database, we will hash it

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) 
        return next();
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});

// method to compare password during login
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}   


export const User = mongoose.model("User", userSchema);