import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import qr from "qr-image";
// import { logger } from "../backend/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

// const absolutePath1 = path.join(__dirname, "..", "frontend", "index2.html");
const app = express();
const port = 3000;
const frontendPath = path.join(__dirname, "frontend");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(frontendPath));
app.use(morgan("tiny"));

app.get("/api", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.post("/submit", (req, res) => {
  const urlFromForm = req.body.floatingInput;
  if (!urlFromForm) {
    return res.status(400).send("שגיאה: חסר נתון להזנה.");
  } else {
    const vg_string = qr.imageSync(urlFromForm, { type: "svg" });
    res.status(200).send(vg_string.toString());
  }
});
app.listen(port, () => {
  console.log(`app listen on port : ${port}`);
});
