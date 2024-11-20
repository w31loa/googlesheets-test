import axios from "axios";
import { getToken } from "../utils/auth.js";
import dotenv from "dotenv";
import { Client } from "../types/client.interface";

dotenv.config();

export async function getClients(): Promise<Client[]> {
  const token = await getToken();
  try {
    const response = await axios.get(`${process.env.API_URL}/clients`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}

export async function getClientStatuses(
  userIds: number[]
): Promise<{ [key: number]: string }> {
  const token = await getToken();
  try {
    const response = await axios.post(
      `${process.env.API_URL}/clients`,
      {
        userIds,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.reduce(
      (
        acc: { [key: number]: string },
        item: { id: number; status: string }
      ) => {
        acc[item.id] = item.status;
        return acc;
      },
      {}
    );
  } catch (error) {
    console.error("Error fetching client statuses:", error);
    throw error;
  }
}
