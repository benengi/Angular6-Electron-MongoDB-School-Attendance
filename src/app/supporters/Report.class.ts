import { Rdet } from './Rdet.class';

export class Report {
    standard: Number;
    section: String;
    students: Rdet[];

    constructor(standard: Number, section: String, Students: Rdet[] ) {
            this.standard = standard;
            this.section = section;
            this.students = Students;
    }
}
