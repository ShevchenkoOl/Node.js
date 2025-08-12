import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/ValidateBody.js";
import Joi from "joi";

const contactsRouter = express.Router();

export const contactAddSchema = Joi.object({
     name: Joi.string().min(3).required(),
    
     email: Joi.string()
    .email({ tlds: { allow: false } }) // перевірка email-формата
    .required(),
  
    phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/) // припустимо, тільки цифри і спочатку "+"
    .required() 
});

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);
// contactsRouter.get("/", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactAddSchema), createContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;