/**
 * Конфигурация для Knex.js, используемая для подключения к PostgreSQL.
 *
 * @module knexfile
 */

import { object, string, preprocess, number } from "zod";

import "../config/env.js";

// Схема валидации переменных окружения. Используется Zod для проверки значений из process.env.

const envSchema = object({
    DB_HOST: string().min(1),
    DB_PORT: preprocess((val) => Number(val), number().int().positive()),
    DB_USER: string().min(1),
    DB_PASSWORD: string().min(1),
    DB_NAME: string().min(1),
});

// Результат парсинга и валидации переменных окружения.

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Ошибка в переменных окружения:", parsedEnv.error.format());
    process.exit(1);
}

/**
 * Конфигурация подключения к базе данных PostgreSQL.
 *
 * @typedef {object} KnexConnectionConfig
 * @property {string} host - Хост базы данных.
 * @property {number} port - Порт базы данных.
 * @property {string} user - Имя пользователя для подключения.
 * @property {string} password - Пароль для подключения.
 * @property {string} database - Имя базы данных для подключения.
 */

/**
 * Конфигурация миграций Knex.js.
 *
 * @typedef {object} KnexMigrationsConfig
 * @property {string} tableName - Имя таблицы для хранения миграций.
 * @property {string} directory - Путь к директории с миграциями.
 */

/**
 * Основная конфигурация Knex.js.
 *
 * @typedef {object} KnexConfig
 * @property {string} client - Тип клиента базы данных.
 * @property {KnexConnectionConfig} connection - Конфигурация подключения.
 * @property {KnexMigrationsConfig} migrations - Конфигурация миграций.
 */

/**
 * Конфигурация Knex.js для подключения к PostgreSQL.
 *
 * @constant {KnexConfig}
 */

const knexConfig = {
    client: "pg",
    connection: {
        host: parsedEnv.data.DB_HOST,
        port: parsedEnv.data.DB_PORT,
        user: parsedEnv.data.DB_USER,
        password: parsedEnv.data.DB_PASSWORD,
        database: parsedEnv.data.DB_NAME,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./migrations",
    },
};

export default knexConfig;
