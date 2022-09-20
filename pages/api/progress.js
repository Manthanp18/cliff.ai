export default function handler(req, res) {
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
