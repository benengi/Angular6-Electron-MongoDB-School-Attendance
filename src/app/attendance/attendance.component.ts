import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {SchoolService } from '../services/school.service';
import { Class } from '../../models/class.entity';
import { DataService } from '../services/data.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Attendance } from '../../models/attendance.entity';
import { School2Service } from '../services/school2.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ,
    private schoolservice: SchoolService, private dataservice: DataService,
     private modalService: NgbModal, calendar: NgbCalendar, private schoolservice2: School2Service) {
    }

 hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  dateofattendance: String;
  fdateofattendance: string;
  tdateofattendance: string;
  closeResult: string;
  classes: Class[] = [];
  standards: Number[] = [];
  dstandards: Number[] = [];
  years: Number[] = [];
  standardValue: Number;
  yearValue: Number;
  model: NgbDateStruct;
  holidayBtnState: Boolean = false;
  singleHoliday: Boolean = true;
  attendance: Attendance;



  ngOnInit() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.schoolservice.findAllClass()
 .subscribe( (tclass: Class[]) => {
          //  tslint:disable-next-line:prefer-const
          for (let k of tclass) {
            this.classes.push(new Class(k._id , null, k.standard, k.section, k.year));

            if (! this.standards.includes(k.standard)) {
                   this.standards.push(k.standard);
            }

            if (! this.years.includes(k.year)) {
              this.years.push(k.year);
       }
         }
});

this.standards = this.standards.sort();
this.years = this.years.sort();
this.setClasses();
  }


setHoliday() {
    console.log('set holiday');
    this.holidayBtnState = true;
    if (this.singleHoliday) {
      this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;
console.log(this.dateofattendance);

this.attendance = new Attendance(null, this.dateofattendance, 'empty', 'Holiday');
this.schoolservice2.createAttendance(this.attendance)
.subscribe(data => console.log(data));

    } else {
      this.fdateofattendance = this.fromDate.year + '-' + this.fromDate.month +  '-' + this.fromDate.day;
      this.tdateofattendance = this.toDate.year + '-' + this.toDate.month +  '-' + this.toDate.day;
    const sdt = new Date(this.fdateofattendance);
    const edt = new Date(this.tdateofattendance);
      while (sdt <= edt) {
        this.dateofattendance = sdt.getFullYear() + '-' + sdt.getMonth() +  '-' + sdt.getDate();
        console.log(this.dateofattendance);
  this.attendance = new Attendance(null, this.dateofattendance, 'empty', 'Holiday');
  this.schoolservice2.createAttendance(this.attendance)
    .subscribe(data => console.log(data));

        sdt.setDate(sdt.getDate() + 1);
      }
 }
  }

dateChange() {
console.log('date changed');
  }

setClasses() {
    console.log('s:' + this.standardValue + 'y:' + this.yearValue);
    console.log('change');
    this.dstandards = [];
    // tslint:disable-next-line:prefer-const
    for (let cls of this.classes) {
      // tslint:disable-next-line:triple-equals
      if (this.yearValue == cls.year && !this.dstandards.includes(cls.standard)) {
          this.dstandards.push(cls.standard);
      }
    }
    console.log(this.dstandards);
  }
putAttendance(cls: Class) {
  this.dataservice.changeClass(cls);
  this.router.navigate(['putattendance'], {relativeTo: this.route});
}

viewAttendance(cls: Class) {
  this.dataservice.changeClass(cls);
  this.router.navigate(['viewattendance'], {relativeTo: this.route});
}

open(content) {
  this.holidayBtnState = false;
    this.modalService.open(content, { centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  setSingleDay() {
    this.singleHoliday = true;
  }
  setMultipleDays() {
    this.singleHoliday = false;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}
