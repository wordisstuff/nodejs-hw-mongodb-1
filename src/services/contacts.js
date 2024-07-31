import Contact from '../models/contacts.js';

export const getAllContacts = async () => {
    const contact = await Contact.find();
    return contact;
};

export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};