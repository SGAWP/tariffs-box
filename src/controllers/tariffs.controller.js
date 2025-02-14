import { createTariff, getAllTariffs } from "../services/tariffs.service.js";
import getBoxRatesData from "../services/wildberries.service.js";

export const createTariffs = async () => {
    try {
        const result = await getBoxRatesData();
        return createTariff(result.response.data.dtNextBox, result.response.data.dtTillMax);
    } catch (error) {
        console.log(error);
    }
};

export const getTariffs = async () => {
    try {
        return getAllTariffs();
    } catch (error) {
        console.log(error);
    }
}
