export interface Subject {
    code: string;
    name: string;
}

export interface RegisterSubjectInterface extends Subject {
    carrer: string;
}