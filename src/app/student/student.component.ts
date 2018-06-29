import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { AuthService } from '../services/Auth.service';
import {Student} from '../../models/student.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  searchText: String;
  adnum: String;
  students: Student[] = [];
  constructor(private schoolservice: SchoolService, private authservice: AuthService,
    private router: Router, private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit() {

    this.schoolservice.findAllStudent()
 .subscribe( (students: Student[]) => {
          //  tslint:disable-next-line:prefer-const
          for (let k of students) {
            this.students.push(new Student( k._id , k.studentid, k.name, k.fathersname,
              k.mothersname, new Date(k.dateofbirth), k.gender, k.phonenumber));
         }
  });

}


AddStudent() {
  this.router.navigate(['newstudent'], {relativeTo: this.route});
}

editStudent(tstudent: Student ) {
  console.log(tstudent);
  this.dataservice.changeStudent(tstudent);
  this.router.navigate(['editstudent'], {relativeTo: this.route});
}

deleteStudent(id: String) {
  if (confirm('Are you sure you want to permanently delete this reocrd')) {
  console.log(id);
  this.schoolservice.deleteStudent(id)
    .subscribe(res => console.log(res));
}
}
}
