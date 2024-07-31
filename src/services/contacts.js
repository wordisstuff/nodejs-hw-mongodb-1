import {ContactSCollection} from '../models/contacts.js';

export const getAllContacts = async () => {
    const contact = await ContactSCollection.find();
    return contact;
};

export const getContactById = async (contactId) => {
    const contact = await ContactSCollection.findById(contactId);
    return contact;
};