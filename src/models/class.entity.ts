import { Student } from './student.entity';

export class Class {
    _id: String;
    students: Student[];
    standard: Number;
    section: String;
    year: Number;
    constructor(id: String , std: Student[] , standard: Number, section: String, year: Number) {
        this._id = id;
        this.standard = standard;
        this.section = section;
        this.year = year;
        this.students = std;
    }
}
