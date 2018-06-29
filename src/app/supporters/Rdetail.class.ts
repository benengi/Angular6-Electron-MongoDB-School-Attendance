import { Class } from '../../models/class.entity';
import { RAbsent } from './Rabsent.class';

export class RDetail {
    _id: String;
    class: Class;
    staffid: String;
    session: String;
    absent: RAbsent[];

    constructor(_id: String, classid: Class, staffid: String, session: String, absentid: RAbsent[]) {
        this.class = classid;
        this.session = session;
        this.staffid = staffid;
        this.absent  = absentid;
     }

}
