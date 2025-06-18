import { RegisterUserInterface } from "../dashboard/interfaces/register-user";
export interface Teacher {
    userUuid: string;
    hireDate: string;
}
export interface RegisterTeacherInterface extends RegisterUserInterface {
    hireDate: string;
}
export interface RegisterFullTeacherInterface extends RegisterTeacherInterface {
    subjectsCodes: string[];
}