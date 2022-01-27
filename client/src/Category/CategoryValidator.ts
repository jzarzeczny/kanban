class CategoryValidator {
    static validateCategoryName(newCategoryName: string): boolean {
        // TODO: validate the replication of category name
        //  - to lower case!
        //  - no empty category!
        if (newCategoryName.trim() === "") {
            return false as boolean;
        }
        const categoryContent = document.querySelectorAll(".radio") as NodeListOf<HTMLElement>;
        const categoryContentArray: HTMLElement[] = Array.from(categoryContent);
        const isItContain: boolean[] = categoryContentArray.map(
            (categoryName: HTMLElement): boolean => {
                const string: string = categoryName["innerText"]
                    .replace("➖", "")
                    .replace("\n", "")
                    .toLowerCase()
                    .trim();

                if (string === newCategoryName.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        const canAddNewCategoryName = isItContain.filter((bol: boolean): boolean => bol === true);

        if (canAddNewCategoryName.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}
export { CategoryValidator };
