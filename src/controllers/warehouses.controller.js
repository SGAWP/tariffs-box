import { createWarehouse } from "../services/warehouses.service.js";
import { getTariffsByDates } from "../services/tariffs.service.js";
import getBoxRatesData from "../services/wildberries.service.js";

/**
 * @typedef {Object} Warehouse
 * @property {string} warehouseName - Название склада.
 * @property {string} boxDeliveryAndStorageExpr - Срок доставки и хранения коробов.
 * @property {string} boxDeliveryBase - Базовая стоимость доставки.
 * @property {string} boxDeliveryLiter - Стоимость доставки за литр.
 * @property {string} boxStorageBase - Базовая стоимость хранения.
 * @property {string} boxStorageLiter - Стоимость хранения за литр.
 * 
/**
 * Функция для создания складов.
 * @returns {Promise<void>}
 */
export const createWarehouses = async () => {
    try {
        const result = await getBoxRatesData();
        const tariff = await getTariffsByDates(result.response.data.dtNextBox, result.response.data.dtTillMax);
        /** @type {Warehouse[]} */
        const warehouseList = result.response.data.warehouseList;
        await Promise.all(
            warehouseList.map(/** @param {Warehouse} warehouse */ warehouse =>
                createWarehouse(
                    tariff.tariff_id,
                    warehouse.warehouseName,
                    warehouse.boxDeliveryAndStorageExpr,
                    warehouse.boxDeliveryBase,
                    warehouse.boxDeliveryLiter,
                    warehouse.boxStorageBase,
                    warehouse.boxStorageLiter
                )
            )
        );
        return Promise.resolve();
    } catch (error) {
        console.log(error);
        throw error;
    }
};