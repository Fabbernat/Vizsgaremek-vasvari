export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    address: string;
    role: "owner" | "customer" | "courier" | "admin";
}