interface NewCategoryObject {
    name: string;
    color: string;
}

interface CategoryObject extends NewCategoryObject {
    _id: string;
}

export { NewCategoryObject, CategoryObject };
