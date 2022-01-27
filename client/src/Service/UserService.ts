import { UserFormInput } from "../validators/userValidators";

class UserService {
    async registerUser(user: UserFormInput) {
        const response = await fetch("http://localhost:5002/mongo/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const registerResponse = await response.json();
        return registerResponse;
    }

    async loginUser(user: UserFormInput) {
        const response = await fetch("http://localhost:5002/mongo/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const loginResponse = await response.json();
        return loginResponse;
    }
}

export { UserService };
