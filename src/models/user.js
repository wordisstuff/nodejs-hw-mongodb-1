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

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };

export const UserCollection = model('user', userSchema);