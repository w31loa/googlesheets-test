import { google, Auth } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const authClient = new Auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth: authClient });

export { sheets };
