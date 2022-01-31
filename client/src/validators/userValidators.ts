interface UserFormInput {
    user: string;
    password: string;
    password2?: string;
}

interface UserFormErrors {
    user?: {
        message: string;
    };
    password?: {
        message: string;
    };
    password2?: {
        message: string;
    };
}

interface UserServiceReturn {
    message: string;
    code: number;
    jwt: string;
}

export { UserFormInput, UserFormErrors, UserServiceReturn };
