# PDFMonkey API Wrapper For Node.js

## Setup

Install the package with:

` npm i pdf-monkey-node`

## Usage

The package needs to be configured with your API secret key. This is avaiable in the [My acccount](https://dashboard.pdfmonkey.io/account) section.

### Test your API KEY

    const PDFMonkey = require("pdf-monkey-node");

    const monkey = new PFDMonkey(SECRET_API_KEY);

    // Test your api key
    monkey
        .getAccountDetails()
        .then( response => {
            // print your account details
            console.(response.current_user)
        })

### Generate a document

    // pass your dynamic info
    const payload = {
    	user: {
    		firstName: "John",
    		lastName:"Doe"
    	}
    }

    //Set the document name or other metadata
    const meta = {
    	_filename:"test.pdf",
    	customerId: "1985782"
    }

    // call the generateDocument method
    monkey
    	.generateDocument(TEMPLATE_ID, payload, meta)
    	.then( result => {
    		// print the document url
    		console.log(result.document.download_url)
    	})
