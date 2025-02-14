import axios from "axios";
import config from "../config/wildberriesApi.js";
import { getCurrentDate } from "../utils/utils.js";

const getBoxRatesData = async () => {
    try {
        const result = await axios.get(config.WB_API_URL, {
            headers: {
                "Authorization": config.WB_API_KEY,
            },
            params: {
                date: getCurrentDate(),
            },
        });
        return result.data;
    } catch (error) {
        console.error("Ошибка при запросе данных из Wildberries API:", error);
        throw new Error("Произошла ошибка при запросе данных из Wildberries API");
    }
};

export default getBoxRatesData;
