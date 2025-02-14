/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export function up(knex) {
    return knex.schema.createTable("warehouses", function (table) {
        table.uuid("warehouse_id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("tariffs_id").notNullable();
        table.foreign("tariffs_id").references("tariff_id").inTable("tariffs").onDelete("CASCADE");
        table.string("warehouse_name").notNullable();
        table.string("box_delivery_and_storage_expr").notNullable();
        table.string("box_delivery_base").notNullable();
        table.string("box_delivery_liter").notNullable();
        table.string("box_storage_base").notNullable();
        table.string("box_storage_liter").notNullable();
        table.unique([
            "tariffs_id",
            "warehouse_name",
            "box_delivery_and_storage_expr",
            "box_delivery_base",
            "box_delivery_liter",
            "box_storage_base",
            "box_storage_liter",
        ]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export function down(knex) {
    return knex.schema.dropTableIfExists("warehouses");
}
