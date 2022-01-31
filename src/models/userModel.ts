import { Schema, model } from "mongoose";
import { User } from "../validators/userValidators";
import crypto from "crypto";

const UserSchema = new Schema<User>({
    user: {
        type: String,
        unique: true,
    },
    hash: String,
    salt: String,
});

UserSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString("hex");
};

UserSchema.methods.validPassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString("hex");
    return this.hash === hash;
};

const userModel = model("UserModel", UserSchema);
export { userModel };
