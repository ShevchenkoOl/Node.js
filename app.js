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
});