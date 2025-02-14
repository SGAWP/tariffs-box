import { object, string } from "zod";
import "../config/env.js";

const configSchema = object({
    WB_API_URL: string().url(),
    WB_API_KEY: string(),
});

const config = configSchema.parse({
    WB_API_URL: process.env.WB_API_URL,
    WB_API_KEY: process.env.WB_API_KEY,
});

export default config;
