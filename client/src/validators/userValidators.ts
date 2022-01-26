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

export { UserFormInput, UserFormErrors };
