import express from "express";
import { connectToDB } from "./db/conn";
import { router } from "./routes/mongoTask";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });
//
const app = express();
const PORT = process.env.PORT || 5002;

const PATH_TO_API: string = "/mongo";
if (process.env.ATLAS_URI) {
    connectToDB(process.env.ATLAS_URI);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../client")));
console.log(path.resolve(__dirname, "../client"));
app.use(PATH_TO_API, router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
