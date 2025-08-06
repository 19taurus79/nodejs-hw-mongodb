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

export const updateContact = async (contactId, payload) => {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, payload, {
    new: false,
  });
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contacts.findByIdAndDelete(contactId);
  return deletedContact;
};
