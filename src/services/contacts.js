import { Contacts } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const contactsQuery = Contacts.find().where('userId').equals(userId);
  const contactsCount = await Contacts.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { data: contacts, ...paginationData };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contacts.find({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await Contacts.create(payload);
  return newContact;
};

export const updateContact = async (contactId, userId, payload) => {
  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: false,
    },
  );
  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await Contacts.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};
