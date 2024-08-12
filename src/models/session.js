// Створіть модель Session з такими полями:

// userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required

import {model, Schema} from 'mongoose';

const sessionSchema = new Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        accessToken:{
            type: String,
            required: true,
        },
        refreshToken:{
            type: String,
            required: true,
        },
        accessTokenValidUntil:{
            type: Date,
            required: true,
        },
        refreshTokenValidUntil:{
            type: Date,
            required: true,
        },
    },
);

export const SessionCollection = model('session', sessionSchema);