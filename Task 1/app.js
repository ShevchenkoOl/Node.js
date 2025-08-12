import { program } from "commander";
import contacts from "./contact.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;

    case "get":
      console.log(await contacts.getContactById(id));
      break;

    case "add":
      console.log(await contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.log(await contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

// Основні комагди для перевірки:
// 1. Виводимо всі контакти node app.js -action list або node app.js -a list

// 2. Виводимо (шукаємо) контакт по id: node app.js -a get -i "Z5sbDlS7pCzNsnAHLtDJd"

// 3. Додаємо новий контакт: node app.js --action add --name "Peter" --email "peter.klic@seznam.cz" --phone "+420785745259" або node app.js -a add -n "Peter" -e "peter.klic@seznam.cz" -p "+420785745259"

// 4. Видаляємо контакт: node app.js -a remove -i "Z5sbDlS7pCzNsnAHLtDJd"