import { Schema, model, Model } from "mongoose";
import { User } from "../validators/userValidators";
import crypto from "crypto";

interface UserInstanceCreation extends Model<User> {}

const UserSchema = new Schema<User, UserInstanceCreation, User>({
    user: String,
    password: String,
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
