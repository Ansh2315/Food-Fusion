import { Schema, model } from "mongoose";

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    address: string;
    isAdmin: boolean;
    token: string;
}


export const UserSchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    token: { type: String, unique: true },
    isAdmin: { type: Boolean, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true,
    toObject: {
        virtuals: true
    }
})

export const UserModel = model<User>('user', UserSchema);