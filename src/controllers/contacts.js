import { ContactCollection } from '../models/contact.js';
import createError from 'http-errors';

export const getAllContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;
  const skip = (page - 1) * perPage;
  const filter = {};

  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const totalItems = await ContactCollection.countDocuments(filter);

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const contacts = await ContactCollection.find(filter).sort(sort).skip(skip).limit(Number(perPage));

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactCollection.findById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const contact = await ContactCollection.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactCollection.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactCollection.findByIdAndDelete(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
