import { google } from "googleapis";
import fs from "fs";
import path from "path";

const tokenPath = path.resolve("token.json");
const refreshPath = path.resolve("refresh.json");

const refresh = JSON.parse(fs.readFileSync(refreshPath, "utf8"));
const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

export async function createOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2(token.web.client_id, token.web.client_secret, token.web.redirect_uris[0]);

    oauth2Client.setCredentials({ refresh_token: refresh.refresh_token });

    return oauth2Client;
}
