class UserRegisterView {
    createUserRegister(): void {
        const userAuthRoot = document.querySelector(".authorization__container") as HTMLElement;
        userAuthRoot.insertAdjacentHTML(
            "beforeend",
            `
                             <form id="auth__register" class="form form--user">
                        <h3 class="form__header">Register</h3>
                        <div class="form__control">
                            <label for="user" class="form__label">User:</label>
                            <input type="text" id="user" class="form__input" />
                            <span class="form__error"></span>
                        </div>
                        <div class="form__control">
                            <label for="password" class="form__label">Password:</label>
                            <input type="password" id="password" class="form__input" />
                            <span class="form__error"></span>
                        </div>
                        <div class="form__control">
                            <label for="password2" class="form__label">Repeat password:</label>
                            <input type="password" id="password2" class="form__input" />
                            <span class="form__error"></span>
                        </div>
                        <input type="submit" class="submit submit--user" value="Register" />
                    </form>
        `
        );
    }
}

export { UserRegisterView };
