import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
 
// const contactsPath = path.resolve("bd", "contacts.json"); // якщо bd і скрипт який буде працбвати з цим файлом знаходиться в одному місці
// якщо в разних місцях то:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "bd", "contacts.json")

const listContacts = async() => {
  try {
        const text = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(text);
  } catch (error) {
        console.log("Невдалося прочитати файл", error)
     }
}

const getContactById = async(contactId) => {
  try {
    const text = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(text);
    const contact = contacts.find(contact => contact.id === contactId);
    if(!contact) {
                console.log(`Контакт з id "${contactId}" не знайдено`);
                return null;
    } 
    return contact;
  } catch (error) {
     console.log(`Невдалося знайти контакт по ${contactId}`, error)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsData = JSON.parse(contacts);

    const contactExist = contactsData.find(contact => contact.id === contactId);
    if(!contactExist){
      console.log(`Невдалося знайти контакт по ${contactId}`, error);
      return null;
    }

    const updateContacts = contactsData.filter(contact => contact.id !== contactId);
    const jsonContacts = JSON.stringify(updateContacts, null, 2);
    await fs.writeFile(contactsPath, jsonContacts, "utf-8");
    console.log(`Контакт з ідентифікатором: ${contactId} успішно видален`);
    return contactExist; 
    
  } catch (error) {
     console.log(`Невдалося знайти контакт по ${contactId}`, error)
  }
}


const addContact = async (name, email, phone) => {
try {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactsData = JSON.parse(contacts);

  const newContact = {
            id: nanoid(),
            name,
            email,
            phone
          }

  contactsData.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2), "utf-8");
  console.log("Новий контакт успішно доьавився");
  return newContact;
} 
catch (error) {
  console.log("Невдалося оновити файл", error);
}
}


export default {
    listContacts,
    getContactById,
    removeContact,
    addContact
};