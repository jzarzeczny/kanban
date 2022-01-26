interface User {
    user: string;
    password: string;
    hash: string;
    salt: string;
    setPassword: (password: string) => void;
    validPassword: (password: string) => boolean;
}
export { User };
