import express from "express";
import { startCronJob } from "./services/cron.service.js";

const app = express();

startCronJob();

app.listen(3200, () => {
    console.log(`Сервер запущен на порту ${3200}`);
});
