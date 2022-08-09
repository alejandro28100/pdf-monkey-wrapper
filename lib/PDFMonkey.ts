import fetch from "node-fetch";
import { baseURL } from "./config.js";
import { GetAccountDetailsResponse } from "./types/GetAccountDetails";
import { GenerateDocumentResponse } from "./types/CreateDocument";
import { FetchDocumentResponse } from "./types/FetchDocument";

class PDFMonkey {
  constructor(public token: string) {
    this.token = token;
  }
  /**
   * Returns the current user's account details.
   * Useful to test the connection to the API.
   */
  getAccountDetails(): Promise<GetAccountDetailsResponse> {
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
        const json = (await response.json()) as GetAccountDetailsResponse;
        return resolve(json);
      } catch (error) {
        return reject(error);
      }
    });
  }

  /**Generates a document */
  async generateDocument(
    /**ID of the source Template to use */
    templateId: string,
    /**Data to use for the Document generation.
     * Can be either an Object or a string of JSON.
     * */
    payload?: { [key: string]: any } | string,

    /**Meta-Data to attach to the Document.
     * Can be either an Object or a string of JSON.
     */
    metadata?: { _filename?: string; [key: string]: any } | string
  ): Promise<GenerateDocumentResponse> {
    return new Promise(async (resolve, reject) => {
      const url = baseURL + "/documents";
      const headers = {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      };

      try {
        const options = {
          method: "POST",
          headers,
          body: JSON.stringify({
            document: {
              document_template_id: templateId,
              meta: metadata,
              payload,
              status: "pending",
            },
          }),
        };
        const response = await fetch(url, options);

        if (response.ok) {
          const { errors, document } =
            (await response.json()) as GenerateDocumentResponse;

          if (errors) {
            return resolve({ errors, document: null });
          }

          let documentStatus = document.status;
          let documentId = document.id;
          let documentResult;

          const getDocOptions = {
            method: "GET",
            headers,
          };

          while (documentStatus !== "success" && documentStatus !== "failure") {
            const request = await fetch(url + "/" + documentId, getDocOptions);
            const json = (await request.json()) as FetchDocumentResponse;
            const { errors, document } = json;

            if (errors) {
              return resolve({ errors, document: null });
            }
            documentResult = document;
            documentStatus = document.status;
            documentId = document.id;
          }
          if (documentResult) {
            return resolve({ document: documentResult, errors: null });
          }
        }

        throw new Error("Document creation failed " + response.statusText);
      } catch (error) {
        return reject({ errors: error, document: null });
      }
    });
  }
}

export default PDFMonkey;
