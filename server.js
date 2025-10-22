const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Pasta onde as imagens serão salvas
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Endpoint de upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Nenhum arquivo enviado" });

  // Gera URL dinâmica para local ou produção
  const base = process.env.PUBLIC_URL || `http://${req.headers.host}`;
  const url = `${base}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Servir arquivos estáticos
app.use("/uploads", express.static(uploadFolder));

// Porta dinâmica
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
