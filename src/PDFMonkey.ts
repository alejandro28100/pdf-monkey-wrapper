import fetch from "node-fetch";
import { baseURL } from "./config";
import { GetAccountDetailsResponse } from "./types/getAccountDetails";

interface PDFMonkey {
  getAccountDetails(): Promise<GetAccountDetailsResponse>;
}

class PDFMonkey {
  constructor(private token: string) {
    this.token = token;
  }

  public async getAccountDetails(): Promise<GetAccountDetailsResponse> {
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
      const json = (await response.json()) as GetAccountDetailsResponse;
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PDFMonkey;
