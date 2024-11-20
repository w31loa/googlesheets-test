import { sheets } from "../config/google-auth.config.js";
import dotenv from "dotenv";
import { Client } from "../types/client.interface";

dotenv.config();

export async function updateGoogleSheet(clients: Client[]) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_RANGE;
  const values = [
    [
      "id",
      "firstName",
      "lastName",
      "gender",
      "address",
      "city",
      "phone",
      "email",
      "status",
    ],
    ...clients.map((client) => [
        client.id.toString(),
        client.firstName.toString(),
        client.lastName.toString(),
        client.gender.toString(),
        client.address.toString(),
        client.city.toString(),
        client.phone.toString(),
        client.email.toString(),
        client.status ? client.status.toString() : "-",
    ]),
  ];

  const resource = {
    values,
  };

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: resource,
    });
    console.log('\x1b[32m%s\x1b[0m',`Google Sheet with id: ${spreadsheetId} updated successfully`);
  } catch (error) {
    console.error("Error updating Google Sheet:", error);
    throw error;
  }
}
