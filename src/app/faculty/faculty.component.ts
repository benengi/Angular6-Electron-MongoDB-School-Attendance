import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { AuthService } from '../services/Auth.service';
import { User } from '../../models/user.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student.entity';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  constructor(private schoolservice: SchoolService, private authservice: AuthService,
    private router: Router, private route: ActivatedRoute, private dataservice: DataService) { }

  Faculties: User[] = [];
  eFaculty: User;

  searchText: String;

  ngOnInit() {

    this.schoolservice.findAllFaculty()
 .subscribe( (users: any[]) => {
          //  tslint:disable-next-line:prefer-const
          for (let k of users) {
            this.Faculties.push(new User(k._id, k.staffid, k.password ,
              k.name, new Date(k.dateofbirth), k.gender, k.email, k.phonenumber));
         }
/*
         console.log('Faculties');
         // tslint:disable-next-line:prefer-const
         for (let f of this.Faculties) {
            console.log(f.password);
         }
*/
});
console.log('Faculties');
console.log(this.Faculties);
}

AddFaculty() {
  this.router.navigate(['newfaculty'], {relativeTo: this.route});
}

editFaculty(tuser: User ) {
  console.log(tuser);
  this.dataservice.changeFaculty(tuser);
  this.router.navigate(['editfaculty'], {relativeTo: this.route});
}

deleteFaculty(id: String) {
  if (confirm('Are you sure you want to permanently delete this record')) {
  console.log(id);
  this.authservice.deleteFaculty(id)
    .subscribe(res => console.log(res));
}
}

}

