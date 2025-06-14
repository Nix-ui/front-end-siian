export interface AuthResponse {
    access_token: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface User {
    uuid: string;
    email: string;
    roles: string[];
}

export interface JwtPayload {
    uuid: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
}
