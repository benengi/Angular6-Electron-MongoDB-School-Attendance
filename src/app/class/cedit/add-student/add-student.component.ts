import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Class } from '../../../../models/class.entity';
import { School2Service } from '../../../services/school2.service';
import { SchoolService } from '../../../services/school.service';
import { Student } from '../../../../models/student.entity';
import { AddStudent } from '../../../supporters/addStudent.class';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private dataservice: DataService,
    private school2service: School2Service ,  private schoolservice: SchoolService) { }

    searchText: String;
    adnum: String;
    students: Student[] = [];
    classid: String;
    added = false;
    addedStudents: String[] = [];
    ngOnInit() {

      this.dataservice.currentClass.subscribe( tclass => this.classid = tclass._id );
      console.log(this.classid);

      this.schoolservice.findAllStudent()
      .subscribe( (students: Student[]) => {
             //  tslint:disable-next-line:prefer-const
             for (let k of students) {
               this.students.push(new Student( k._id , k.studentid, k.name, k.fathersname,
                 k.mothersname, new Date(k.dateofbirth), k.gender, k.phonenumber));
            }
     });
  }

  addStudent(sid: String, stdid: String) {
      const addet = new AddStudent(this.classid, sid);
    this.school2service.addStudent(addet)
    .subscribe(data => console.log(data));
    this.addedStudents.push(stdid);
  }

  doneStudent() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  check(id: String) {
      if (this.addedStudents.includes(id)) {
          return true;
      } else {
        return false;
      }
  }
}
