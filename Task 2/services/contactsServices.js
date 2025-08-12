import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json"); 


const getAllContacts = async() => { 
    try {
        const read = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(read);
    
    } catch (error) {
        console.log("Виникла помилка при роботі з файлом:", error.message)
    }
}

const rewriteContacts = async (id, data) => { // Для перезаписуванні контакту, ми мажмо передати цей контакт, який мажмо дописати
    try {
        const contacts = await getAllContacts();
        const index = contacts.findIndex(item => item.id === id);
        if(index === -1){
            return null;
        }
        contacts[index] = {id, ...data} // перезаписуємо контакт
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // Перезвписуємо json файл
        return contacts[index]; // Повертажмо оновлений контакт
    }
    catch(error){
        console.log("Виникла помилка при перезаписуванні файлу", error.message)
    }
}


const getContactById = async (contactId) => {
    try {
        const allContacts = await getAllContacts();
        const result = allContacts.find(element => element.id === contactId);
        return result || null;
    } catch (error) {
         console.log("Виникла помилка при пошуку id-контакта", error.message)
    }
}


const removeContact = async (contactId) => {
    try {
        const allContacts = await getAllContacts();
        const index = allContacts.findIndex(c => c.id === contactId);

    if (index === -1) {
      return null; // контакт не найден
    }

    const [removedContact] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2)); // збкрігаємо оновлений список контактів
    return removedContact; // повертажмо видалений контакт

    } catch (error) {
        console.log("Виникла помилка при видаленню контакта по id", error.message)
    }
}


const addContact = async ({name, email, phone}) => {
  try {
    const allContacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    allContacts.push(newContact);
    await rewriteContacts(allContacts);
    return newContact;

  } catch (error) {
     console.log("Виникла помилка при додаванню контакта", error.message)
  }
}

export default{
    getAllContacts,
    rewriteContacts,
    getContactById,
    addContact,
    removeContact
}


