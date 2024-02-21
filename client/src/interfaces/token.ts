export interface Token {
    userId: number;
    username: string;
    email: string;
    role: string;
    iat: number; // Время создания токена
    exp: number; // Время истечения срока действия токена
}