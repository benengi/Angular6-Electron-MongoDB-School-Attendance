import { Absent } from './absent.entity';

export class Detail {
    _id: String;
    class: String;
    staffid: String;
    session: String;
    absent: Absent[];

    constructor(_id: String, classid: String, staffid: String, session: String, absentid: Absent[]) {
        this.class = classid;
        this.session = session;
        this.staffid = staffid;
        this.absent  = absentid;
     }

}
