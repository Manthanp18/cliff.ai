const { google } = require("googleapis");
// const { oauthClient } = require("../../gdrive-api/config");

export default async function handler(req, res) {
  const { client_id, client_secret, redirect_uri } = process.env;
  // const SCOPES = [
  //   "https://www.googleapis.com/auth/drive",
  //   "https://www.googleapis.com/auth/userinfo.profile",
  // ];
  const sheets = google.sheets("v4");

  const oauthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );
  const { tokens, sheetId } = req.body;

  try {
    oauthClient.setCredentials(tokens);
    // const service = google.sheets({ version: "v4", auth });
    // const sheetId = window ? window.localStorage.getItem("sheetID") : null;
    const request = {
      // The spreadsheet to request.
      spreadsheetId: sheetId, // TODO: Update placeholder value.

      // The ranges to retrieve from the spreadsheet.
      ranges: [], // TODO: Update placeholder value.

      // True if grid data should be returned.
      // This parameter is ignored if a field mask was set in the request.
      includeGridData: false, // TODO: Update placeholder value.

      auth: oauthClient,
    };

    const response = (await sheets.spreadsheets.get(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
    return res.send({ data: response });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
}
