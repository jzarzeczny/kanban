import { Schema, model } from "mongoose";
import { Category } from "../validators/taskValidators";

const CategorySchema = new Schema<Category>({
    color: String,
    name: String,
});
const categoryModel = model("CategoryModel", CategorySchema);
export { categoryModel };
