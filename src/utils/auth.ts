import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getToken(): Promise<string> {
  try {
    const response = await axios.post(`${process.env.API_URL}/auth/login`, {
      username: process.env.API_USERNAME,
    });
    console.log('\x1b[32m%s\x1b[0m',`Authorization with login ${process.env.API_USERNAME} done!`)
    return response.data.token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}
