import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { School2Service } from '../services/school2.service';
import { Student } from '../../models/student.entity';
import * as jsPDF from 'jspdf';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Attendance2 } from '../../models/attendance2.entity';
import { Detail } from '../../models/detail.entity';
import { Report } from '../supporters/Report.class';
import { SchoolService } from '../services/school.service';
import { Class } from '../../models/class.entity';
import { Rdet } from '../supporters/Rdet.class';
import { RAttendance } from '../supporters/Rattendance.class';
import { RDetail } from '../supporters/Rdetail.class';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';
import 'rxjs/add/observable/from';
import { Absent } from '../../models/absent.entity';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  @ViewChild('content') content: ElementRef;

  constructor(private schoolservice2: School2Service, private Schoolservice: SchoolService) { }

  students: Student[] = [];
  model: NgbDateStruct;
  dateofattendance: String;
  attendance: Attendance2;
  reports: Report[] = [];
  detail: Detail[] = [];
  std: Number;
  sec: String;
  cls: Class;
  rdet: Rdet[] = [];
  sflag = false;
  cflag  = false;
  sf  = false;
  cf = false;
  rdetail: RDetail[] = [];
  rattendance: RAttendance;
  req: Promise<HttpClient>[] = [];
  absentids: Absent[] = [];
  generated = false;
  ngOnInit() {
    const now = new Date();
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }


  getrdet(abs: Absent[]) {
    console.log(abs);
    // tslint:disable-next-line:prefer-const
 let ids: String [] = [];
    // tslint:disable-next-line:prefer-const
    let trdet: Rdet[] = [];
    // tslint:disable-next-line:prefer-const
    for (let ab of abs) {
      ids.push(ab.student);
    }
    // tslint:disable-next-line:prefer-const
    for (let  t of this.rdet) {
      if (ids.includes(t.objid)) {
          trdet.push(t);
      }
    }
    console.log(trdet);
      return trdet;
  }
  genReport() {
    this.dateofattendance = this.model.year + '-' + this.model.month +  '-' + this.model.day;
    this.schoolservice2.getReport(this.dateofattendance)
    .subscribe((data: RAttendance) => {
      this.rdetail = data.details;
      this.rdetail = this.rdetail.sort(function(a: RDetail , b: RDetail) {
        const p: any = a.class.standard;
        const q: any = b.class.standard;
return p - q;
       });
       this.rdetail = this.rdetail.sort(function(a: RDetail , b: RDetail) {
         if (a.class.section < a.class.section) { return -1; }
         if (a.class.section > a.class.section) { return 1; }
         return 0;
 });
    });
    console.log(this.rdetail);
  this.generated = true;
  }

  printReport() {
// tslint:disable-next-line:prefer-const
let doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: [297, 210]
});
// tslint:disable-next-line:prefer-const
let specialElementHandlers = {
  '#editor': function(element, renderer) {
    return true;
  }
};

// tslint:disable-next-line:prefer-const
let content = this.content.nativeElement;

doc.fromHTML(content.innerHTML, 15, 15, {
    'width': 220,
    'elementHandlers': specialElementHandlers
});
doc.save('report.pdf');
}

}
