import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import steamAPI from "./steamapi.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", steamAPI);

app.listen(PORT, () => {
  console.log(`✅  http://localhost:${PORT}`);
});
