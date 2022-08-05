type GenerationLog = {
  type: "info" | "error";
  message: string;
  timestamp: number;
};

/**The Document object represents a single
 * document (PDF), with its status,
 * data and meta-data. It is used to manipulate
 * the data used to generate a PDF. */
export interface Document {
  /** Unique identifier for the object. */
  id: string;

  /** Unique identifier of the Document's Workspace */
  app_id: string;

  /** Internal checksum of the Document's content, mainly used for the Document's preview. */
  checksum: string;

  /** Time at which the object was created. */
  created_at: string;

  /** Unique identifier of the Document's Template.*/
  document_template_id: string;

  /**The URL at which the Document can be downloaded. Valid for 1 hour
   *
   * Any time you fetch the details of a document, you get a fresh download URL.
   *
   * It is valid for 1 hour. Once that time has passed, you'll need to fetch
   * the Document's details again to get a fresh URL.
   */
  download_url: string;

  /**In case the Document's status is failure, this field will contain the reason of the failure. In any other case, this will be null. */
  failure_cause: string;

  /**Name of the generated file when the Document's status is success, will be null otherwise. */
  filename: string;

  /**Logs collected during the Document's generation.
   *
   * Can be especially useful in case of generation failure.
   *
   * Will default to an empty array [] before the generation.
   * */
  generation_logs: GenerationLog[];

  /**The meta-data of the Document. Can be null or an arbitrary
   * object containing data that you want to attach to a Document.
   * This can be useful when using integrations, like Zapier or Integromat,
   * as the payload will not be accessible. */
  meta: string;

  /**The {@link https://docs.pdfmonkey.io/references/liquid/defining-and-using-dynamic-data dynamic data} used to build the content of the Document.
   * Must represent a JSON object, not an array. */
  payload: string;

  /**This URL is especially useful if you want to embed a preview
   * of the PDF in your own UI. A good example of this is the
   * preview in our own dashboard, when you create a new Document.
   *
   * This attributes is often mixed up with the Download URL but
   * it cannot be used to download a generated PDF, it should
   * only be used in an iframe. */
  preview_url: string;

  /**This URL will be present if your account has {@link https://docs.pdfmonkey.io/pdfmonkey-features/share-links Share Links} enabled.
   * It is a permalink to the generated PDF.
   *
   * The share links feature is only available for Premium plans.
   * */
  public_share_link: string;

  /**Represents the current status of the Documents. You can learn
   * more in the {@link https://docs.pdfmonkey.io/references/the-document-lifecycle#statuses Document Lifecycle documentation page}.
   */
  status: string;

  /**Time at which the object was last updated. */
  updated_at: string;
}
