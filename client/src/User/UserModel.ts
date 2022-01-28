import { UserFormInput, UserServiceReturn } from "../validators/userValidators";
import { UserService } from "../Service/UserService";
import { UserView } from "./UserView";

enum InputDataType {
    Login = "login",
    Register = "register",
    Error = "error",
}

class UserModel {
    userService = new UserService();
    userView = new UserView();
    username: string = "";
    // userController = new UserController();

    // Methods have to be private, once they are used in the class only

    async userModelRunner(userFormInputData: UserFormInput) {
        let loginProcessDone;
        const inputType: string = this.submitTheUserForm(userFormInputData);

        if (inputType === InputDataType.Login) {
            const loginServerResponse = await this.submitLogin(userFormInputData);
            loginProcessDone = this.decisionMakingLogin(loginServerResponse);
        } else if (inputType === InputDataType.Register) {
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

    private submitTheUserForm(userFormInputData: UserFormInput): InputDataType {
        if (Object.keys(userFormInputData).length === 2) {
            return InputDataType.Login;
        } else if (Object.keys(userFormInputData).length === 3) {
            return InputDataType.Register;
        } else {
            return InputDataType.Error;
        }
    }
    private async submitLogin(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.loginUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        return serverResponse;
    }

    private async submitRegister(userFormInputData: UserFormInput) {
        const serverResponse: UserServiceReturn = await this.userService.registerUser({
            user: userFormInputData.user,
            password: userFormInputData.password,
        });
        return serverResponse;
    }

    private decisionMakingLogin(serverResponse: UserServiceReturn): boolean {
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

    get currentUserData(): string {
        return this.username;
    }
}

export { UserModel };
