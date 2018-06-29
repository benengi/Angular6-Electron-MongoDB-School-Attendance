import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from '../../../models/user.entity';
import {AuthService} from '../../services/Auth.service';
import { isoStringToDate, ISO8601_DATE_REGEX } from '@angular/common/src/i18n/format_date';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-fsignup',
  templateUrl: './fsignup.component.html',
  styleUrls: ['./fsignup.component.css']
})
export class FsignupComponent implements OnInit {

  signUpForm: FormGroup;
  genders = ['male', 'female'];
  fstate = true;

  tdate = new Date('10-12-1998');

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'staffid': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'dateofbirth': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required),
      'email': new FormControl(null, [ Validators.required, Validators.email]),
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
const user = new User(null, k.staffid, k.password ,
      k.name, new Date(k.dateofbirth), k.gender, k.email, k.phonenumber);

  console.log(user);

this.authservice.signUp(user)
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

