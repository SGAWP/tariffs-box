import { getAllTariffs } from "./tariffs.service.js";
import { getAllWarehouses } from "./warehouses.service.js";

async function fetchWarehouses() {
  return getAllWarehouses();
}

async function fetchTariffs() {
  return getAllTariffs();
}

/**
 * Создает карту тарифов, где ключ — это тариф, а значение — информация о следующем сроке и максимальной дате.
 * @param {Array<{ tariff_id: string, dt_next_box: string, dt_till_max: string }>} tariffs
 * @returns {Record<string, { dt_next_box: string, dt_till_max: string }>}
 */
function createTariffMap(tariffs) {
  return tariffs.reduce((/** @type {Record<string, { dt_next_box: string; dt_till_max: string; }>} */ acc, /** @type {{ tariff_id: string; dt_next_box: string; dt_till_max: string; }} */ tariff) => {
    acc[tariff.tariff_id] = { dt_next_box: tariff.dt_next_box, dt_till_max: tariff.dt_till_max };
    return acc;
  }, {});
}

/**
 * Преобразует данные складов, добавляя информацию о тарифах.
 * @param {Array<{ warehouse_name: string, tariffs_id: string, box_delivery_and_storage_expr: string, box_delivery_base: string, box_delivery_liter: string, box_storage_base: string, box_storage_liter: string }>} warehouses
 * @param {Record<string, { dt_next_box: string, dt_till_max: string }>} tariffMap
 * @returns {Array<{ warehouse_name: string, dt_next_box: string, dt_till_max: string, box_delivery_and_storage_expr: string, box_delivery_base: string, box_delivery_liter: string, box_storage_base: string, box_storage_liter: string }>}
 */
function transformWarehouses(warehouses, tariffMap) {
  return warehouses.map((/** @type {{ warehouse_name: string; tariffs_id: string; box_delivery_and_storage_expr: string; box_delivery_base: string; box_delivery_liter: string; box_storage_base: string; box_storage_liter: string; }} */ warehouse) => ({
    warehouse_name: warehouse.warehouse_name,
    dt_next_box: tariffMap[warehouse.tariffs_id]?.dt_next_box || '',
    dt_till_max: tariffMap[warehouse.tariffs_id]?.dt_till_max || '',
    box_delivery_and_storage_expr: warehouse.box_delivery_and_storage_expr,
    box_delivery_base: warehouse.box_delivery_base,
    box_delivery_liter: warehouse.box_delivery_liter,
    box_storage_base: warehouse.box_storage_base,
    box_storage_liter: warehouse.box_storage_liter
  }));
}

export async function fetchData() {
  const warehouses = await fetchWarehouses();
  const tariffs = await fetchTariffs();
  const tariffMap = createTariffMap(tariffs);
  return transformWarehouses(warehouses, tariffMap);
}
