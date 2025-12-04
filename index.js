import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
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
  const Email = req.body.floatingInput;
  const password = req.body.floatingPassword;
  console.log(`your email is ${Email} and your password is ${password}`);
  res.send(`your email is ${Email} and your password is ${password}`);
});
app.listen(port, () => {
  console.log(`app listen on port : ${port}`);
});
