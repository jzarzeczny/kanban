import { UserFormInput } from "../validators/userValidators";

class UserModel {
    submitTheUserForm(userFormInputData: UserFormInput) {
        if (Object.keys(userFormInputData).length === 2) {
            this.submitLogin();
        } else if (Object.keys(userFormInputData).length === 3) {
            this.submitRegister();
        }
    }
    submitLogin() {}

    submitRegister() {}
}

export { UserModel };
