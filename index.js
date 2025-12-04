import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import qr from "qr-image";
import inquirer from "inquirer";
// import { logger } from "../backend/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const absolutePath = path.join(
  __dirname,
  "..",
  "backend_2",
  "frontend",
  "index.html"
);
// const absolutePath1 = path.join(__dirname, "..", "frontend", "index2.html");
const app = express();
const port = 3000;
// app.use(logger);
function logger(req, res, next) {
  console.log("method : ", req.method);
  console.log("method .url: ", req.url);
  next();
}
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api", (req, res) => {
  res.sendFile(absolutePath);
});

app.post("/submit", (req, res) => {
  // const Email = req.body.floatingInput;
  // const password = req.body.floatingPassword;
  // console.log(`your email is ${Email} and your password is ${password}`);
  // res.send(`your email is ${Email} and your password is ${password}`);
  const urlFromForm = req.body.floatingInput;

  // ודא שהנתון קיים לפני שאתה ממשיך
  if (!urlFromForm) {
    return res.status(400).send("שגיאה: חסר נתון להזנה.");
  }

  // --- יצירת קוד ה-QR והקובץ ---

  // 1. יצירת stream (זרם) של SVG
  var qr_svg = qr.image(urlFromForm, { type: "svg" });

  // 2. שמירת ה-SVG לקובץ
  // במקום fs.createWriteStream("qr_img.svg"), השתמש בנתיב מלא או יחסי
  qr_svg.pipe(fs.createWriteStream("qr_img_" + Date.now() + ".svg"));

  // 3. כתיבת הקישור לקובץ טקסט
  fs.writeFile("URL.txt", urlFromForm, (err) => {
    if (err) {
      console.error("שגיאה בכתיבת קובץ:", err);
      // אם יש שגיאה בכתיבת הקובץ, עדיין שלח תגובה לדפדפן
      // חשוב: לוודא ששולחים תגובה רק פעם אחת
    } else {
      console.log("הקובץ נשמר בהצלחה.");
    }
  });

  // 4. שליחת תגובה לדפדפן (העבר את res.send לפה)
  // מומלץ לשלוח הודעת הצלחה או הפנייה מחדש
  res.send(`<h1>קוד ה-QR נוצר בהצלחה!</h1><p>הקישור שסופק: ${urlFromForm}</p>`);
});
app.listen(port, () => {
  console.log(`app listen on port : ${port}`);
});
