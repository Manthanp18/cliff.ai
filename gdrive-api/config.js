import { google } from "googleapis";
import { oauth2 } from "googleapis/build/src/apis/oauth2";

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
// console.log(
//   oauthClient.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   })
// );

const v2Client = google.oauth2({
  auth: oauthClient,
  version: "v2",
});

export default {
  oauthClient,
  SCOPES,
  v2Client,
};
