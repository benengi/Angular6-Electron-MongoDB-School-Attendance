import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from '../../../models/user.entity';
import {AuthService} from '../../services/Auth.service';
import { Student } from '../../../models/student.entity';
import { SchoolService } from '../../services/school.service';
@Component({
  selector: 'app-ssignup',
  templateUrl: './ssignup.component.html',
  styleUrls: ['./ssignup.component.css']
})
export class SsignupComponent implements OnInit {

  signUpForm: FormGroup;
  genders = ['male', 'female'];
  fstate = true;

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute, 
    private schoolservice: SchoolService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'studentid': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'fathersname': new FormControl(null, Validators.required),
      'mothersname': new FormControl(null, Validators.required),
      'dateofbirth': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required),
      'phonenumber': new FormControl(null, Validators.required)
    });
  }

  signUp() {

    if (confirm('Are you sure to signup with this Details check before you proceed')) {
    this.fstate = true;
 //   console.log(typeof( this.signUpForm.value.dateofbirth));
  //  console.log(new Date(this.signUpForm.value.dateofbirth));
const k = this.signUpForm.value;

    if ( this.signUpForm.valid) {
    console.log(this.signUpForm.value);
  const tstudent = new Student(null, k.studentid, k.name, k.fathersname,
      k.mothersname, new Date(k.dateofbirth), k.gender, k.phonenumber);

  console.log(tstudent);

this.authservice.StudentsignUp(tstudent)
.subscribe(
  data => {
    console.log('Signup Success');
  },
  err => {
    console.log(err);
    console.error('signup failed');
     },
);
      this.signUpForm.reset();
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.fstate = false;
    }

  }
}

}
