// Подключение к базе данных

import knex from "knex";
import knexConfig from "../db/knexfile.js";

const db = knex(knexConfig);

export default db;
