import mongoose from "mongoose";
const connectToDB = (dbUrl: string) => {
    mongoose.connect(`${dbUrl}`, (err) => {
        if (err) {
            console.log(err.message);
            console.log(err);
        } else {
            console.log("Connected to database");
        }
    });
};
export { connectToDB };
