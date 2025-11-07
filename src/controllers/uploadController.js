export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }
  const base = process.env.PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
  const url = `${base}/uploads/${req.file.filename}`;
  return res.json({ url });
}
