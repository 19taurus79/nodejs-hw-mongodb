import { Contacts } from '../db/models/contacts.js';

export const getContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await Contacts.create(payload);
  return newContact;
};
