import { WarehouseModel } from "../models/warehouses.js";

const warehouseModel = new WarehouseModel();

/**
 * @param {string} tariffs_id
 * @param {string} warehouse_name
 * @param {string} box_delivery_and_storage_expr 
 * @param {string} box_delivery_base 
 * @param {string} box_delivery_liter
 * @param {string} box_storage_base 
 * @param {string} box_storage_liter
 */
async function createWarehouse(
    tariffs_id,
    warehouse_name,
    box_delivery_and_storage_expr,
    box_delivery_base,
    box_delivery_liter,
    box_storage_base,
    box_storage_liter,
) {
    try {
        const newWarehouse = await warehouseModel.createWarehouse({
            tariffs_id,
            warehouse_name,
            box_delivery_and_storage_expr,
            box_delivery_base,
            box_delivery_liter,
            box_storage_base,
            box_storage_liter,
        });
        return newWarehouse;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getAllWarehouses() {
    try {
        return warehouseModel.getAllWarehouses();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export { createWarehouse, getAllWarehouses };
