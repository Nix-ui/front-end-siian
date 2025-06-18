export interface Course {
    id: number;
    subjectCode: string;
    teacherUuid: string;
    paralelNumber: number;
    academicPeriod: number;
    capacity: number;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterCourseInterface {
    subjectCode: string;
    teacherUuid: string;
    paralelNumber: number;
    academicPeriod: number;
    capacity: number;
}
