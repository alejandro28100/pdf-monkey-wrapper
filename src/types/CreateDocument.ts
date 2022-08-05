import { Document } from "./Document";

export interface CreateDocumentSuccessResponse {
  /**The Document object represents a single
   * document (PDF), with its status,
   * data and meta-data. */
  document: Document;
  errors: null;
}

export interface CreateDocumentErrorResponse {
  errors: {
    [key: string]: any;
  };
  document: null;
}

export type CreateDocumentResponse =
  | CreateDocumentSuccessResponse
  | CreateDocumentErrorResponse;
