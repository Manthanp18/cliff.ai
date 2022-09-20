import axios from "axios";
import baseUrl from "./baseUrl";

export async function upload(tokens) {
  try {
    const response = await axios.post(`${baseUrl}/api/upload`, {
      tokens,
    });
    return response;
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function getProgress(fileId) {
  try {
    const response = await axios.get(
      `${baseUrl}/api/progress?fileId=${fileId}`
    );
    return response.data;
  } catch (err) {
    return { success: false };
  }
}

export async function getSheet(tokens, sheetId) {
  try {
    const response = await axios.post(`${baseUrl}/api/getsheet`, {
      tokens,
      sheetId,
    });
    return response;
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
