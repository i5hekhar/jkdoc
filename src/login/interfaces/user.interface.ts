export interface UserData {
    id: number;
    username: string;
    roleId?: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface UserRole {
    id: number;
    name: string;
    code: string;
    access: string[];
    isAllow: boolean;
}