import db from "../config/database.js";
import { string, object } from "zod";

/**
 * @typedef {object} Tariff
 * @property {string} tariff_id
 * @property {string} dt_next_box
 * @property {string} dt_till_max
 */

export class TariffModel {

    constructor() {
        this.db = db;
    }

    tariffSchema = object({
        dt_next_box: string(),
        dt_till_max: string(),
    });

    /**
     * @param {{ dt_next_box: string; dt_till_max: string }} data
     * @returns {Promise<Tariff>}
     */
    async createTariff(data) {
        this.tariffSchema.parse(data);

        const [tariff] = await this.db("tariffs")
            .insert(data)
            .onConflict(["dt_next_box", "dt_till_max"]) 
            .merge()
            .returning("*");

        return tariff;
    }

    /**
     * @param {string} dt_next_box
     * @param {string} dt_till_max
     * @returns {Promise<Tariff>}
     */
    async getTariffsByDates(dt_next_box, dt_till_max) {
        return this.db("tariffs").where({ dt_next_box, dt_till_max }).first();
    }

    /** @returns {Promise<Tariff[]>} */
    async getAllTariffs() {
        return this.db("tariffs").select("*");
    }
}
