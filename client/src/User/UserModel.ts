import { UserFormInput, UserServiceReturn } from "../validators/userValidators";
import { UserService } from "../Service/UserService";
import { UserView } from "./UserView";

class UserModel {
    userService = new UserService();
    userView = new UserView();
    username: string = "";
    // userController = new UserController();

    async userModelRunner(userFormInputData: UserFormInput) {
        let loginProcessDone;
        const inputType = this.submitTheUserForm(userFormInputData);

        if (inputType === "login") {
            const loginServerResponse = await this.submitLogin(userFormInputData);
            loginProcessDone = this.decisionMakingLogin(loginServerResponse);
        } else if (inputType === "register") {
            const registerServerResponse = await this.submitRegister(userFormInputData);
            loginProcessDone = this.decisionMakingRegister(registerServerResponse);
        } else {
            alert("We have a situation here");
        }
        if (loginProcessDone) {
            this.username = userFormInputData.user;
        }
        return loginProcessDone;
    }

    submitTheUserForm(userFormInputData: UserFormInput): string {
        if (Object.keys(userFormInputData).length === 2) {
            return "login";
        } else if (Object.keys(userFormInputData).length === 3) {
            return "register";
        } else {
            return "error";
        }
    }
    async submitLogin(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.loginUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        return serverResponse;
    }

    async submitRegister(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.registerUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        return serverResponse;
    }

    decisionMakingLogin(serverResponse: UserServiceReturn): boolean {
        switch (serverResponse.code) {
            case 201:
                this.userView.removeUserTemplate();
                return true;
            case 400:
                this.userView.displayErrorMessage("user", serverResponse.message);
                return false;
            case 401:
                this.userView.displayErrorMessage("password", serverResponse.message);
                return false;
            default:
                this.userView.displayErrorMessage("user", "Crazy error happened");
                return false;
        }
    }
    decisionMakingRegister(serverResponse: UserServiceReturn) {
        switch (serverResponse.code) {
            case 201:
                this.userView.removeUserTemplate();
                return true;
            case 400:
                this.userView.displayErrorMessage("user", serverResponse.message);
                return false;
            case 401:
                this.userView.displayErrorMessage("user", serverResponse.message);
                return false;
            default:
                this.userView.displayErrorMessage("user", "Crazy error happened");
                return false;
        }
    }
}

export { UserModel };
