import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from '../../../models/user.entity';
import {AuthService} from '../../services/Auth.service';
import { Student } from '../../../models/student.entity';
import { DataService } from '../../services/data.service';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-sedit',
  templateUrl: './sedit.component.html',
  styleUrls: ['./sedit.component.css']
})
export class SeditComponent implements OnInit {

  constructor(private schoolservice: SchoolService, private authservice: AuthService,
     private router: Router, private route: ActivatedRoute, private dataservice: DataService) { }

  signUpForm: FormGroup;
  genders = ['male', 'female'];
  eStudent: Student;
  fstate = true;
  ngOnInit() {
    this.dataservice.currentStudent.subscribe( tstudent => this.eStudent = tstudent );
    this.signUpForm = new FormGroup({
      'studentid': new FormControl(this.eStudent.studentid, Validators.required),
      'name': new FormControl(this.eStudent.name, Validators.required),
      'fathersname': new FormControl(this.eStudent.fathersname, Validators.required),
      'mothersname': new FormControl(this.eStudent.mothersname, Validators.required),
      'dateofbirth': new FormControl(this.eStudent, Validators.required),
      'gender': new FormControl(this.eStudent.gender, Validators.required),
      'phonenumber': new FormControl(this.eStudent.phonenumber, Validators.required)
    });
  }

  makeEdit() {
this.fstate = true;
    if ( this.signUpForm.valid) {
    const k = this.signUpForm.value;
    const tstudent = new Student( this.eStudent._id , k.studentid, k.name, k.fathersname,
      k.mothersname, new Date(k.dateofbirth), k.gender, k.phonenumber);

      this.schoolservice.editStudent(tstudent)
      .subscribe(data => console.log(data));
      this.signUpForm.reset();
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.fstate = false;
    }
  }
}
