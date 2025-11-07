import express from "express";
import cors from "cors";

import uploadRoutes from "./src/routes/uploadRoutes.js";
import { uploadFolder } from "./src/config/upload.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/heart", (req, res) => {
  res.send("🚀 Servidor Express Online");
});

// Rotas
app.use("/", uploadRoutes);

// Arquivos estáticos (uploads)
app.use("/uploads", express.static(uploadFolder));

// Start local somente fora da Vercel
const isVercel = !!process.env.VERCEL;
const PORT = process.env.PORT || 3001;
if (!isVercel) {
  app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
}

// Exporta o app para a Vercel
export default app;
