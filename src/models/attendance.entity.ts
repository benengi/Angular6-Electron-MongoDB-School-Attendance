import { Detail } from './detail.entity';

export class Attendance {
    _id: String;
    dateofattendance: String;
    details: String;
    status: String;


    constructor(_id: String, dateofattendance: String, detail: String, status: String) {
        this.dateofattendance = dateofattendance;
        this._id = _id;
        this.details = detail;
        this.status = status;
    }

}
