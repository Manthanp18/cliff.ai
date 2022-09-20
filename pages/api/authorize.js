const { google } = require("googleapis");
// const { oauthClient } = require("../../gdrive-api/config");
// import { oauthClient, SCOPES } from "../../gdrive-api/config";

export default function handler(req, res) {
  const { client_id, client_secret, redirect_uri } = process.env;
  const SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ];

  const oauthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );
  try {
    const authUrl = oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return res.json({ success: true, authUrl });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  }
}
