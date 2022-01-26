import express from "express";
import { connectToDB } from "./db/conn";
import { taskRouter } from "./routes/mongoTask";
import { categoryRouter } from "./routes/mongoCategory";
import { userRouter } from "./routes/mongoUser";
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
app.use(express.static(path.resolve(__dirname, "../dist/client")));
app.use(PATH_TO_API, taskRouter);
app.use(PATH_TO_API, userRouter);

app.use(PATH_TO_API + "/category", categoryRouter);

app.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});
