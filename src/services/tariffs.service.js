import { TariffModel } from "../models/tariffs.js";

const tariffModel = new TariffModel();

/**
 * @param {string} dt_next_box
 * @param {string} dt_till_max
 */
async function createTariff(dt_next_box, dt_till_max) {
    try {
        const newTariff = await tariffModel.createTariff({
            dt_next_box: dt_next_box,
            dt_till_max: dt_till_max,
        });
        return newTariff;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getAllTariffs() {
    try {
        return tariffModel.getAllTariffs();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

/**
 * @param {string} dt_next_box
 * @param {string} dt_till_max
 */

async function getTariffsByDates(dt_next_box, dt_till_max) {
    try {
        return tariffModel.getTariffsByDates(dt_next_box, dt_till_max);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export { createTariff, getAllTariffs, getTariffsByDates };
