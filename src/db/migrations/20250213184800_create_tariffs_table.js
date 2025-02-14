/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export function up(knex) {
    return knex.schema.createTable("tariffs", function (table) {
        table.uuid("tariff_id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("dt_next_box");
        table.string("dt_till_max");
        table.unique(["dt_next_box", "dt_till_max"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export function down(knex) {
    return knex.schema.dropTableIfExists("tariffs");
}
