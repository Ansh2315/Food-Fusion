import { Schema, model } from "mongoose";

export interface User {
    id: string;
    email: string;
    name: string;
    address: string;
    token: string;
    isAdmin: boolean;
}


export const UserSchema = new Schema<User>({
    email: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    token: { type: String, required: true },
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

export const FoodModel = model<User>('user', UserSchema);