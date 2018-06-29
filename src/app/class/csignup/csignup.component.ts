import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService} from '../../services/school.service';
import { User } from '../../../models/user.entity';
import { AuthService} from '../../services/Auth.service';
import { Class } from '../../../models/class.entity';
@Component({
  selector: 'app-csignup',
  templateUrl: './csignup.component.html',
  styleUrls: ['./csignup.component.css']
})
export class CsignupComponent implements OnInit {

  signUpForm: FormGroup;
  fstate = true;

  constructor(private schoolservice: SchoolService, private authservice: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    const y = (new Date()).getFullYear();
    console.log(y);

    this.signUpForm = new FormGroup({
      'standard': new FormControl(null, Validators.required),
      'section': new FormControl(null, Validators.required),
      'year': new FormControl(y, Validators.required)
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
const tclass = new Class(null, null, k.standard, k.section, k.year);

  console.log(tclass);

this.authservice.classsignUp(tclass)
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
