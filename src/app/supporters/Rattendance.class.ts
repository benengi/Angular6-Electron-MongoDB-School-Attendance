import { RDetail } from './Rdetail.class';

export class RAttendance {
    _id: String;
    dateofattendance: String;
    details: RDetail[];
    status: String;


    constructor(_id: String, dateofattendance: String, detail: RDetail[], status: String) {
        this.dateofattendance = dateofattendance;
        this._id = _id;
        this.details = detail;
        this.status = status;
    }

}
