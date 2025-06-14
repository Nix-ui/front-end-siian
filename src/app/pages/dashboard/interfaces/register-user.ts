export interface RegisterUserInterface {
    id: number;
    email: string;
    password: string;
    firstName: string;
    maternalLastName: string;
    paternalLastName: string;
    department: string;
    province: string;
    street: string;
    details?: string;
}
