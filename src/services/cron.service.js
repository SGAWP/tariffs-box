import cron from "node-cron";
import { createTariffs } from "../controllers/tariffs.controller.js";
import { createWarehouses } from "../controllers/warehouses.controller.js";
import { uploadToGoogleSheets } from "./googleSheets.service.js";
import { array, string } from "zod";

const sheetsIdsSchema = array(string().min(1));

export const startCronJob = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            const sheetsIds = sheetsIdsSchema.parse(process.env.SHEETS_IDS?.split(","));
            await createTariffs();
            await createWarehouses();
            await uploadToGoogleSheets(sheetsIds);
        } catch (error) {
            console.error("Ошибка в cron задаче", error);
        }
    });
};
