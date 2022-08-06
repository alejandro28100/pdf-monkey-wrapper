import { Document } from "./Document";

export interface FetchDocumentSuccessResponse {
  /**The Document object represents a single
   * document (PDF), with its status,
   * data and meta-data. */
  document: Document;
  errors: null;
}

export interface FetchDocumentErrorResponse {
  errors: {
    [key: string]: any;
  };
  document: null;
}

export type FetchDocumentResponse =
  | FetchDocumentSuccessResponse
  | FetchDocumentErrorResponse;
