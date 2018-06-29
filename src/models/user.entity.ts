export class  User {
    _id: String;
    staffid: string;
    password: string;
    name: String;
    dateofbirth: Date;
    gender: String;
    email: String;
    phonenumber: String;

    constructor(id: String, staffid: string, password: string, name: String, dateofbirth: Date,
         gender: String, email: String, phonenumber: String) {
        this._id = id;
        this.staffid = staffid;
        this.password = password;
        this.name = name;
        this.dateofbirth = dateofbirth;
        this.gender = gender;
        this.email = email;
        this.phonenumber = phonenumber;
    }
}
