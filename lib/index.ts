import PDFMonkey from "./PDFMonkey";

(async () => {
  const monkey = new PDFMonkey("tciGHSanJ5_n6MUm_TeJ");
  try {
    const { current_user, errors } = await monkey.getAccountDetails();
    if (errors) {
      return console.error(errors);
    }
    console.log(current_user);

    const templateId = "5FD5BD11-A29A-4E3A-AFB0-B323CA915B39";
    const payload = {
      user: {
        firstName: "John",
        lastName: "Doe",
      },
    };
    const metadata = { _filename: "test.pdf" };
    const response = await monkey.generateDocument(
      templateId,
      payload,
      metadata
    );

    if (response.errors) {
      return console.log(response.errors);
    }

    console.log(response.document);
  } catch (error) {
    console.log(JSON.stringify({ error }, null, 2));
  }
})();

export default PDFMonkey;
