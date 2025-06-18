export interface Carrer {
    id: number;
    name: string;
    description: string;
    totalSemester: number;
    departmentId: number;
    state: boolean;
    creationDate: string;
}
export interface RegisterCarrerInterface {
    name: string;
    description: string;
    totalSemester: number;
    departmentId: number;
    state: string | 'active' | 'inactive'|'close';
    creationDate: string;
}