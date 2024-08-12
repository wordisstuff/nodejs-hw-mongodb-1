// Створіть модель User з такими полями:

// name - string, required
// email - string, email, unique, required
// password - string, required
// createdAt - дата створення
// updatedAt - дата оновлення

import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            email: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt:{Date},
        updatedAt :{Date},
    },
    {
        timestamps: true,
      },
);

export const UserCollection = model('user', userSchema);