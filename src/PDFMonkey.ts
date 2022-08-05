import fetch from "node-fetch";
import { baseURL } from "./config";
import { GetAccountDetailsResponse } from "./types/GetAccountDetails";
import { CreateDocumentResponse } from "./types/CreateDocument";

class PDFMonkey {
  constructor(public token: string) {
    this.token = token;
  }
  /**
   * Returns the current user's account details.
   * Useful to test the connection to the API.
   */
  async getAccountDetails(): Promise<GetAccountDetailsResponse> {
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

  async createDocument(
    /**ID of the source Template to use */
    templateId: string,

    /**
     *
     * Can be one of:
     *
     * -draft
     *
     * -pending (default)
     *
     * To generate the Document,
     * the status is set to pending. Doing so,
     * the Document will be queued for generation directly.
     */
    status: "draft" | "pending",
    /**Data to use for the Document generation.
     * Can be either an Object or a string of JSON.
     * */
    payload?: { [key: string]: any } | string,

    /**Meta-Data to attach to the Document.
     * Can be either an Object or a string of JSON.
     */
    metadata?: { [key: string]: any } | string
  ): Promise<CreateDocumentResponse> {
    const url = baseURL + "/documents";
    const headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          document: {
            document_template_id: templateId,
            meta: metadata,
            payload,
            status,
          },
        }),
      });
      const json = (await response.json()) as CreateDocumentResponse;
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PDFMonkey;
