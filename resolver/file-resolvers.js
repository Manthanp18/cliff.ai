const { default: axios } = require("axios");
const { google } = require("googleapis");
const { oauthClient } = require("../gdrive-api/config");
const { getRandomId } = require("../utils");

async function uploadToGDrive(req, res) {
  //   const { tokens } = req.body;
  //   try {
  //     oauthClient.setCredentials(tokens);
  //     const drive = google.drive({
  //       version: "v3",
  //       auth: oauthClient,
  //     });
  //     const files = [];
  //     try {
  //       const data = await drive.files.list({
  //         q: `mimeType='application/vnd.google-apps.spreadsheet'`,
  //         fields: "files(id, name)",
  //         spaces: "drive",
  //       });
  //       // Array.prototype.push.apply(files, res.files);
  //       // res.data.files.forEach(function (file) {
  //       //   console.log("Found file:", file.name, file.id);
  //       // });
  //       return res.send({ data: data.data.files });
  //     } catch (err) {
  //       // TODO(developer) - Handle error
  //       throw err;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return res.json({ success: false, message: err.message });
  //   }
}

async function getProgress(req, res) {
  const { fileId } = req.query;

  if (!fileId) {
    res.status(400);
    return res.json({
      success: false,
      message: "Request failed! expected fileId is missing.",
    });
  }
  if (fileMeta[fileId]) {
    return res.json({
      success: true,
      progress: fileMeta[fileId].progress,
    });
  }
  res.status(404);
  return res.json({
    success: false,
    message: "file not found",
  });
}

module.exports = {
  uploadToGDrive,
  getProgress,
};
