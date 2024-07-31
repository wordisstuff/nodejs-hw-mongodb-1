// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   email: { type: String },
//   isFavourite: { type: Boolean, default: false },
//   contactType: {
//     type: String,
//     enum: ['work', 'home', 'personal'],
//     required: true,
//     default: 'personal'
//   }
// }, { timestamps: true });

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;


import { model, Schema } from 'mongoose';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);
export const ContactCollection = model('Contact', contactSchema);