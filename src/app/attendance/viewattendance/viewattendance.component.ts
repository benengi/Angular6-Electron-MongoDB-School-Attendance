import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
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
  selector: 'app-viewattendance',
  templateUrl: './viewattendance.component.html',
  styleUrls: ['./viewattendance.component.css']
})
export class ViewattendanceComponent implements OnInit {

  attendance: Attendance2;
  constructor(private router: Router, private route: ActivatedRoute ,
    private schoolservice: SchoolService, private dataservice: DataService, private school2service: School2Service) { }

    eClass: Class;
    model: NgbDateStruct;
    sessions = ['Morning', 'AfterNoon'];
    sessionValue: String;
    dateofattendance: String;
    students: Student[] = [];
    absentStudents: Absent[] = [];
    noAttendance: Boolean = false;
    submitted: Boolean = false;
    classDetail: Detail;
  ngOnInit() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.dataservice.currentClass.subscribe(cls => {
      this.eClass = cls;
      console.log(this.eClass._id);
  });

  this.school2service.getClassStudents(this.eClass._id)
  .subscribe( (data: Class) => {
          console.log('comp');
          this.students = data.students;
      //    console.log(this.students);
  });

  }

  checkAbsent(id: String) {
    let aflag = false;
   // console.log(id);
    // tslint:disable-next-line:prefer-const
    for (let abs of this.absentStudents) {
        if (abs.student === id) {
            aflag = true;
    }
    }
return aflag;
  }

  getReason(id: String) {
    // tslint:disable-next-line:prefer-const
    for (let abs of this.classDetail.absent) {
          if (abs.student === id) {
            return abs.reason;
          }
    }
    return '-';
  }

  submit() {
    this.absentStudents = [];
    let dflag = true;
    this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;
    this.school2service.viewAttendance(this.dateofattendance)
    .subscribe((data: Attendance2) => {
      if (data == null) {
       console.log('No Record Found');
       this.noAttendance = true;
    } else {
      this.submitted = true;
      this.attendance = data;
      // tslint:disable-next-line:prefer-const
      for (let det of this.attendance.details) {
          if (det.class === this.eClass._id && det.session === this.sessionValue) {
            this.classDetail = det;
            dflag = false;
         }
      }
      this.noAttendance = dflag;

      // tslint:disable-next-line:prefer-const
      for (let abs of this.classDetail.absent) {
          this.absentStudents.push(abs);
      }
    }
   });
   console.log('Absenties');
   console.log(this.absentStudents);
  }

}
