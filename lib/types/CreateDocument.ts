import { Document } from "./Document";

export interface GenerateDocumentSuccessResponse {
  /**The Document object represents a single
   * document (PDF), with its status,
   * data and meta-data. */
  document: Document;
  errors: null;
}

export interface GenerateDocumentErrorResponse {
  errors: {
    [key: string]: any;
  };
  document: null;
}

export type GenerateDocumentResponse =
  | GenerateDocumentSuccessResponse
  | GenerateDocumentErrorResponse;
