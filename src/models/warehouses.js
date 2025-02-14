import db from "../config/database.js";
import { string, object } from "zod";

/**
 * @typedef {object} Warehouse
 * @property {string} warehouse_id
 * @property {string} tariffs_id
 * @property {string} warehouse_name
 * @property {string} box_delivery_and_storage_expr
 * @property {string} box_delivery_base
 * @property {string} box_delivery_liter
 * @property {string} box_storage_base
 * @property {string} box_storage_liter
 */

export class WarehouseModel {
    constructor() {
        this.db = db;
    }

    warehouseSchema = object({
        tariffs_id: string().uuid(),
        warehouse_name: string(),
        box_delivery_and_storage_expr: string(),
        box_delivery_base: string(),
        box_delivery_liter: string(),
        box_storage_base: string(),
        box_storage_liter: string(),
    });

    /**
     * @param {Omit<Warehouse, "warehouse_id">} data
     * @returns {Promise<Warehouse>}
     */
    async createWarehouse(data) {
        this.warehouseSchema.parse(data);

        const [warehouse] = await this.db("warehouses")
            .insert(data)
            .onConflict([
                "tariffs_id",
                "warehouse_name",
                "box_delivery_and_storage_expr",
                "box_delivery_base",
                "box_delivery_liter",
                "box_storage_base",
                "box_storage_liter",
            ])
            .merge()
            .returning("*");
        return warehouse;
    }

    /**
     * @param {string} warehouse_id
     * @returns {Promise<Warehouse | null>}
     */
    async getWarehouseById(warehouse_id) {
        return this.db("warehouses").where({ warehouse_id }).first();
    }

    async getAllWarehouses() {
        return this.db("warehouses").select("*");
    }
}
