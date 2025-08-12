import HttpError from "../helpers/HttpError.js";
import { contactAddSchema } from "../routes/contactsRouter.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactsService.getAllContacts();
        if(!contacts){
            // const error = new Error (`The contacts are not found`);
            // error.status(404);
            // або
            throw HttpError(404);
        }
        return res.json(contacts);
    } catch (error) {
        return res
        .status(error.status || 500)
        .json({ message: error.message || "Server error" });
    }
};

export const getOneContact = async (req, res) => {
     try {
        const contactId = await contactsService.getContactById(req.params.id);
        if(!contactId) {
            throw HttpError(404);
        }
        res.json(contactId); // якщо поставимо return, то нижній console.log() - не буде виконаний
        //console.log("Этот код тоже выполнится"); 
        
     } catch (error) {
        return res
        .status(error.status || 500)
        .json({ message: error.message || "Server error" });
     }
};

export const deleteContact = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if(!result){
        throw HttpError(404, `The contact with ${id} not found`)
    }
        // res.status(204).send();
        res.json({
            message: "Delete is success"
        });
    } catch (error) {
        next(error)
    }
};

export const createContact = async(req, res, next) => {
    try {
    //console.log(req.body); // { name: 'Jose La Costa', email: 'lacosta@gmail.com', phone: '778457489' }, undefined - тоді треба записати app.use(express.json());
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body)
    res.status(201).json(result);
    } catch (error) {
        next(error)
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result  = await contactsService.rewriteContacts(id, req.body);
    if(!result){
        throw HttpError(404, `The contact with ${id} not found`)
    }
    res.status(201).json(result);
    } catch (error) {
        next(error)
    }
};