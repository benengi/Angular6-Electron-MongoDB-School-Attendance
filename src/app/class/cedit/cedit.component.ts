import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from '../../../models/user.entity';
import {AuthService} from '../../services/Auth.service';
import { DataService } from '../../services/data.service';
import { Class } from '../../../models/class.entity';
import { School2Service } from '../../services/school2.service';
import { Student } from '../../../models/student.entity';

@Component({
  selector: 'app-cedit',
  templateUrl: './cedit.component.html',
  styleUrls: ['./cedit.component.css']
})
export class CeditComponent implements OnInit {

  eClass: Class;
  classid: String;
  students: Student[];
  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute, private dataservice: DataService,
  private school2service: School2Service) { }

  ngOnInit() {

    this.dataservice.currentClass.subscribe( tclass => {
        this.eClass = tclass;
        this.classid = this.eClass._id;
      } );
    console.log(this.classid);

   this.school2service.getClassStudents(this.classid)
    .subscribe( (data: Class) => {
            console.log('comp');
            this.students = data.students;
            console.log(this.students);
    });
  }

  addStudent() {
      this.router.navigate(['addstudent'], {relativeTo: this.route});
  }

  removeStudent(std: Student) {
    if (confirm('Are you sure you want to remove this student from this class')) {

      this.school2service.removeStudent(std, this.classid)
      .subscribe(data => {
console.log(data);

this.students.splice(this.students.indexOf(std), 1);
});
 }
  }

  viewStudent(std: Student) {

  }

}
