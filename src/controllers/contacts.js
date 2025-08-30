import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const contacts = await getContacts({
    page: req.validatedQuery.page,
    perPage: req.validatedQuery.perPage,
    sortBy: req.validatedQuery.sortBy,
    sortOrder: req.validatedQuery.sortOrder,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const data = req.body;
  data.userId = req.user._id;
  const photo = req.file;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      data.photo = await saveFileToCloudinary(photo);
    } else {
      data.photo = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact(data);
  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  const userId = req.user._id;
  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const deletedContact = await deleteContact(contactId, userId);
  if (!deletedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).json({
    status: 204,
    message: 'Successfully deleted a contact!',
  });
};
