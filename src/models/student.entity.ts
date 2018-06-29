export class Student {
    _id: String;
    studentid: Number;
    name: String;
    fathersname: String;
    mothersname: String;
    dateofbirth: Date;
    gender: String;
    phonenumber: String;


constructor( id: String  , studentid: Number, name: String, fathersname: String, mothersname: String,
    dateofbirth: Date, gender: String,
        phonenumber: String) {
            this._id = id;
        this.studentid = studentid;
        this.fathersname = fathersname;
        this.mothersname = mothersname;
        this.phonenumber = phonenumber;
        this.dateofbirth = dateofbirth;
        this.gender = gender;
        this.name = name;
    }
}
