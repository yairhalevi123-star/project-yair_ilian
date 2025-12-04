import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`app listen on port : ${port}`);
});
