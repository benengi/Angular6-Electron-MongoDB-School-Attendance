import { Detail } from './detail.entity';


export class Attendance2 {
    _id: String;
    dateofattendance: String;
    details: Detail[];
    status: String;


    constructor(_id: String, dateofattendance: String, detail: Detail[], status: String) {
        this.dateofattendance = dateofattendance;
        this._id = _id;
        this.details = detail;
        this.status = status;
    }

}
