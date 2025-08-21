import express from "express";
import mongoose from "mongoose";

const HOST_DB =
  "mongodb+srv://iteduka:vw0KIIHyyBqAkO57@cluster0.pupubo1.mongodb.net/feedback_iteduka?retryWrites=true&w=majority&appName=Cluster0"; // після останнього слеша і перед знаком питання ми прописуємо ім'я бази в даному випадку це feedback_iteduka
// якщо ми напишимо назву бази якої не існує, то помилки не буде, просто він її сам створить і підключиться
mongoose
  .connect(HOST_DB) // для підключення повертаємлся до веб версії MongoDB - Сonnect - Driver - і копіруємо url, незабува.чи вставити пароль
  .then(() => {
    const app = express();
    app.listen(3000, () => console.log("The srvere running on the port 3000"));
  }) // якщо успішео підключилися то ми підключаємо наш веб сервер
  .catch((error) =>{
    console.log(error.message)
    process.exit(1) // закриває запущенні процеси
}); // якщо не успішео підключилися

// Коли у тебе проект на Node.js і він працює з MongoDB, є два різні рівні:
//    - Код проекту (Node.js, Express і т.д.) – ти його зберігаєш у GitHub/GitLab. Це місце зберігання коду, але Git сам по собі не запускає твою програму. Тобто, якщо залити код тільки в Git – він лежатиме там як архів, але працювати (відповідати на HTTP-запити) не буде;
//    - Хостинг/сервер (Render, Vercel, Railway, Heroku і т.д.) – це вже місце, де твій код реально запускається і постійно працює. Туди підтягується код з Git і запускається як сервіс (Node.js процес).

// Render бере твій репозиторій з GitHub, робить деплой (збирає, запускає, дає тобі домен).
// Тоді твій бекенд "живе" в інтернеті і може підключатися до MongoDB.

// ⚡ Чому не можна обмежитися тільки Git:
//    - GitHub = сховище коду (як флешка з історією).
//    - Render = сервер, де код реально виконується.
// Отже: 
//     - переходимо за посиланням: https://dashboard.render.com/;
//     - авторизужмося - + Add New - Web Services;
//     - Connect Git provider - GitHub;
// mongodb+srv://iteduka:vw0KIIHyyBqAkO57@cluster0.pupubo1.mongodb.net/
