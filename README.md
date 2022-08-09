# PDFMonkey API Wrapper For Node.js

## Setup

Install the package with:

` npm i pdf-monkey-wrapper`

## Usage

The package needs to be configured with your API secret key. This is available in the [My account](https://dashboard.pdfmonkey.io/account) section.

### CommonJS

```javascript
const PDFMonkey = (...args) =>
  import("pdf-monkey-node").then(
    ({ default: PDFMonkey }) => new PDFMonkey(...args)
  );

const API_TOKEN = "xxxxxxxxxxxxxxxx";

(async () => {
  const monkey = await PDFMonkey(API_TOKEN);

  // test your API-KEY
  const { errors, current_user } = await monkey.getAccountDetails();
  console.log(current_user, errors);
})();
```

### ES Modules

```javascript
import PDFMonkey from "pdf-monkey-node";

const API_TOKEN = "xxxxxxxxxxxxxxxx";

(async () => {
  const monkey = new PDFMonkey(API_TOKEN);

  // test your API-KEY
  const { errors, current_user } = await monkey.getAccountDetails();
  console.log(current_user, errors);
})();
```

### Generate a document

```javascript
const DOCUMENT_TEMPLATE_ID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX";

// pass your dynamic info
const payload = {
  user: {
    firstName: "John",
    lastName: "Doe",
  },
};

//Set the document name using the reserved field "_filename" or other metadata
const meta = {
  _filename: "test.pdf",
  customerId: "1985782",
};

// call the generateDocument method
monkey.generateDocument(DOCUMENT_TEMPLATE_ID, payload, meta).then((result) => {
  // print the document url
  console.log(result.document.download_url);
});
```
