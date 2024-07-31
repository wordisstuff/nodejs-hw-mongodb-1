import {ContactCollection} from '../models/contact.js';

export const getAllContacts = async () => {
    const contact = await ContactCollection.find();
    return contact;
};

export const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId);
    return contact;
};