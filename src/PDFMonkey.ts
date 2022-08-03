import fetch from "node-fetch";
import { baseURL } from "./config";
import { getAccountDetailsResponse } from "./types/responses";

class PDFMonkey {
  constructor(private token: string) {
    this.token = token;
  }

  public getAccountDetails(): Promise<getAccountDetailsResponse> {
    return new Promise(async (resolve, reject) => {
      const url = baseURL + "/current_user";
      const headers = {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });
        const data = await response.json();
        resolve(data as getAccountDetailsResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default PDFMonkey;
