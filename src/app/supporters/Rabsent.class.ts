import { Student } from '../../models/student.entity';

export class RAbsent {
    _id: String;
   student: Student;
   reason: String;


    constructor(id: String, student: Student, reason: String) {
       this._id = id;
        this.student = student;
        this.reason = reason;
    }

}
