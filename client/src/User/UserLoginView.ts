class UserLoginView {
    createUserLogin(): HTMLElement {
        const userAuthRoot = document.querySelector(".authorization__container") as HTMLElement;
        userAuthRoot.insertAdjacentHTML(
            "beforeend",
            `
                                <form id="auth__login" class="form form--user">
                        <h3 class="form__header">Login</h3>
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
                        <input type="submit" class="submit submit--user" value="Login" />
                    </form>
        `
        );
        return document.querySelector(".form--user") as HTMLElement;
    }
}
// Zwrotka z typem w celu nadania eventlistnera na odpowiedni element

export { UserLoginView };
