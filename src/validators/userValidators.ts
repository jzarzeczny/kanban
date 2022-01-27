interface User {
    user: { type: string; unique: boolean };
    hash: string;
    salt: string;
    setPassword: (password: string) => void;
    validPassword: (password: string) => boolean;
}
export { User };
