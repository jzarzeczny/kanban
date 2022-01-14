"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = (dbUrl) => {
    mongoose_1.default.connect(`${dbUrl}`, (err) => {
        if (err) {
            console.log(err.message);
            console.log(err);
        }
        else {
            console.log("Connected to database");
        }
    });
};
exports.connectToDB = connectToDB;
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
