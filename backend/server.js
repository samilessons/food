import express from 'express';
import sqlite3 from "sqlite3";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
const PORT = 4200;

// const upload = multer(); 

app.use(cors());
app.use(express.json());

app.post("/support/", (req, res) => {
  res.status(200).send({"message": "success"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});