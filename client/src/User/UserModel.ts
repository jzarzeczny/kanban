import { UserFormInput, UserServiceReturn } from "../validators/userValidators";
import { UserService } from "../Service/UserService";
import { UserView } from "./UserView";
import { Main } from "../Main";

class UserModel {
    userService = new UserService();
    userView = new UserView();

    // userController = new UserController();

    submitTheUserForm(userFormInputData: UserFormInput) {
        if (Object.keys(userFormInputData).length === 2) {
            this.submitLogin(userFormInputData);
        } else if (Object.keys(userFormInputData).length === 3) {
            this.submitRegister(userFormInputData);
        }
    }
    async submitLogin(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.loginUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        this.decisionMakingLogin(serverResponse);
    }

    async submitRegister(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.registerUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        this.decisionMakingRegister(serverResponse);
    }

    decisionMakingLogin(serverResponse: UserServiceReturn) {
        switch (serverResponse.code) {
            case 201:
                this.userView.removeUserTemplate();
                break;
            case 400:
                this.userView.displayErrorMessage("user", serverResponse.message);

                break;
            case 401:
                console.log("Invalid password");
                this.userView.displayErrorMessage("password", serverResponse.message);

                break;
            default:
                this.userView.displayErrorMessage("user", "Crazy error happened");
                break;
        }
    }
    decisionMakingRegister(serverResponse: UserServiceReturn) {
        switch (serverResponse.code) {
            case 201:
                this.userView.removeUserTemplate();
                break;
            case 400:
                this.userView.displayErrorMessage("user", serverResponse.message);
                break;
            case 401:
                this.userView.displayErrorMessage("user", serverResponse.message);
                break;
            default:
                this.userView.displayErrorMessage("user", "Crazy error happened");
                break;
        }
    }
}

export { UserModel };
