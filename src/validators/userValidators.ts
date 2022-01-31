interface User {
    user: { type: string; unique: boolean };
    hash: string;
    salt: string;
    setPassword: (password: string) => void;
    validPassword: (password: string) => boolean;
    generateAccessToken: (user: string) => string;
    decodeAccessToken: (token: string) => string;
}
export { User };
