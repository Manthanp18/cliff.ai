const { google } = require("googleapis");
// const { oauthClient } = require("../../gdrive-api/config");

export default async function handler(req, res) {
  const { client_id, client_secret, redirect_uri } = process.env;
  // const SCOPES = [
  //   "https://www.googleapis.com/auth/drive",
  //   "https://www.googleapis.com/auth/userinfo.profile",
  // ];

  const oauthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );
  const { tokens } = req.body;

  try {
    oauthClient.setCredentials(tokens);
    const drive = google.drive({
      version: "v3",
      auth: oauthClient,
    });
    const files = [];
    try {
      const data = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.spreadsheet'`,
        fields: "files(id, name)",
        spaces: "drive",
      });
      // Array.prototype.push.apply(files, res.files);
      // res.data.files.forEach(function (file) {
      //   console.log("Found file:", file.name, file.id);
      // });

      return res.send({ data: data.data.files });
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
}
