import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SchoolService } from '../../services/school.service';
import { Class } from '../../../models/class.entity';
import { DataService } from '../../services/data.service';
import { School2Service } from '../../services/school2.service';
import { Student } from '../../../models/student.entity';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Absent } from '../../../models/absent.entity';
import { Detail } from '../../../models/detail.entity';
import { Attendance } from '../../../models/attendance.entity';
import { Attendance2 } from '../../../models/attendance2.entity';

@Component({
  selector: 'app-putattendance',
  templateUrl: './putattendance.component.html',
  styleUrls: ['./putattendance.component.css']
})
export class PutattendanceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ,
    private schoolservice: SchoolService, private dataservice: DataService, private school2service: School2Service) { }

    eClass: Class;
    model: NgbDateStruct;
    sessions = ['Morning', 'AfterNoon'];
    sessionValue: String;
    absentStudentsid: String[] = [];
    absentDetailsMap  = new Map();
    absentStudents: Absent [] = [];
    dateofattendance: String;
    staffid: String;
    students: Student[] = [];
    absentDetail: Detail;
    detailid: String;
    attendance: Attendance;
    cflag: boolean;
    savedDetail: Detail;
    obtainedAttendance: Attendance;
    obtainedDetails: Detail[] = [];
    dateStatus: Boolean = true;
    dateStatusPresent: Boolean = false;
    sessionStatus: Boolean = false;
    checkAttendance: Attendance2;
  ngOnInit() {

    this.cflag = false;
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.dataservice.currentClass.subscribe(cls => {
        this.eClass = cls;
        console.log(this.eClass._id);
    });
  /*  this.dataservice.loggedFaculty.subscribe(id => {
      this.staffid = id;
    });
*/
    this.staffid = '5b0bdf3c7cacfe239829f18a';
    this.school2service.getClassStudents(this.eClass._id)
    .subscribe( (data: Class) => {
            console.log('comp');
            this.students = data.students;
        //    console.log(this.students);
    });

    this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;
  this.school2service.viewAttendance(this.dateofattendance)
  .subscribe((data: Attendance2) => {
    if ( data !== null && data.status === 'Holiday') {
      this.dateStatus = false;
    }
this.dataservice.changeAttendance(data);
this.checkAttendance = data;
  });
}

checkStudent(id: String) {
  if (this.absentStudentsid.includes(id)) {
    return true;
  } else {
    return false;
  }
}

checkStudent2(id: String) {
  if (this.absentStudentsid.includes(id)) {
    return false;
  } else {
    return true;
  }
}

checkDate() {
console.log('check date');
  this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;
  this.school2service.viewAttendance(this.dateofattendance)
  .subscribe((data: Attendance2) => {
    if ( data !== null && data.status === 'Holiday') {
      this.dateStatus = false;
    } else {
      this.dateStatus  = true;
    }

this.dataservice.changeAttendance(data);
this.checkAttendance = data;
  });
}

checkSession() {
  console.log('check session');
 let flg = false;
  if ( this.checkAttendance !== null && this.checkAttendance.status === 'WorkingDay') {
  //  console.log(this.checkAttendance);
    // tslint:disable-next-line:prefer-const
    for (let det of this.checkAttendance.details) {
        // tslint:disable-next-line:triple-equals
        if (det.class === this.eClass._id && det.session == this.sessionValue) {
          flg  = true;
    }
    }
  }
  this.sessionStatus = flg;
}

presentStudent(id: String) {
  console.log('present');
    if (this.absentStudentsid.includes(id)) {
          this.absentStudentsid.splice(this.absentStudentsid.indexOf(id), 1);
    }
}

absentStudent(id: String) {
  console.log('absent');
  this.absentStudentsid.push(id);
}

checkAbsent(id: String) {
  if (this.absentStudentsid.includes(id)) {
    return true;
  } else {
    return false;
  }
}

updateAbsent(e: any, id: String) {
  if (this.absentStudentsid.includes(id)) {
      this.absentDetailsMap.set(id, e.target.value);
  }
}
submit() {

this.cflag = false;
  this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;

      this.absentDetailsMap.forEach(function(value, key) {
          this.absentStudents.push(new Absent(null, key, value));
      }.bind(this));
// console.log(this.absentStudents);
const temp: Absent[] = [];
// tslint:disable-next-line:prefer-const
for (let astud of this.absentStudents) {
  if ((this.absentStudentsid.includes(astud.student))) {
    temp.push(astud);
  }
}
this.absentStudents = temp;
      this.absentDetail = new Detail(null, this.eClass._id, this.staffid, this.sessionValue, this.absentStudents);
   //   console.log(this.absentDetail);

   this.school2service.viewAttendance(this.dateofattendance)
   .subscribe((data: Attendance2) => {
    console.log('Initail Details');
    console.log(data);
     if (data == null) {
    console.log('No Attendance Found');
    this.attendance = new Attendance(null, this.dateofattendance, 'empty', 'WorkingDay');
    this.school2service.createAttendance(this.attendance)
    .subscribe((att: Attendance) => {console.log(att); this.obtainedAttendance = att; }, (err) => console.log(err) ,
    () => {
      this.school2service.putDetail(this.absentDetail)
          .subscribe(obtaineddetail => {this.savedDetail = obtaineddetail; console.log('Detail Created'); console.log(this.savedDetail);
           } , (err) => { console.log(err); },
          () => {
            console.log('Insert Detail in Create Attendance');
    //        console.log(this.obtainedAttendance._id, this.savedDetail._id);
      this.school2service.putAttendanceDetail(this.obtainedAttendance._id, this.savedDetail._id)
      .subscribe(returnedDetail => console.log(returnedDetail));

      this.router.navigate(['../'], {relativeTo: this.route});
     }
     );
    });
   } else {
     console.log('Attendance present');
     this.obtainedDetails = data.details;
console.log('Details');
     console.log(this.obtainedDetails);
        // tslint:disable-next-line:prefer-const
        for (let det of this.obtainedDetails) {
          if (det.class === this.eClass._id && det.session === this.sessionValue) {
            this.cflag = true;
          }
        }
        if (this.cflag === true) {
                     console.log('Detail already present');
        }  else {
          console.log('Detail not present');
         this.school2service.putDetail(this.absentDetail)
          .subscribe(obtaineddetail => {this.savedDetail = obtaineddetail; }, (err) => { console.log(err);
          }, () => {
          this.school2service.putAttendanceDetail(data._id, this.savedDetail._id)
          .subscribe(returnedDetail => {
  //          console.log(returnedDetail);
            this.router.navigate(['../'], {relativeTo: this.route});
           });
           } );
        }
    }
   });

   /*   this.school2service.putDetail(this.absentDetail)
      .subscribe(data => {
        console.log('stores detail');
   //     console.log(data);
        this.detailid = data._id;
        console.log('Stored detail ID:');
        console.log(this.detailid);
      }, (err) => {
          console.log(err);
        } , () => {
        this.attendance = new Attendance(null, this.dateofattendance, this.detailid);
        console.log('Attendance:');
        console.log(this.attendance);


        this.school2service.putAttendance(this.attendance)
        .subscribe(data => console.log(data));
      });
*/
     }
}
