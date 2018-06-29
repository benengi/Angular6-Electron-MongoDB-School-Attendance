import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../../models/user.entity';
import {AuthService} from '../services/Auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute, 
  private dataservice: DataService) { }

  fstate: Boolean;
  staffid: String = '5b0bdf3c7cacfe239829f18a';

  ngOnInit() {

  this.loginForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  });

  this.fstate = true;
  }

  onSubmit() {
   // console.log(this.loginForm);
    this.fstate = true;
    const user = new User(null, this.loginForm.value.username, this.loginForm.value.password ,
      'viswa', new Date(), 'male', 'rv@gmail.com', '12345');

     // console.log('value at component:' + user);

    this.authservice.signIn(user)
    .subscribe(
      data => {
        this.dataservice.changeLoggedFaculty(this.staffid);
        console.log('login Success');
        this.router.navigate(['/home']);

      },
      err => {
        console.log(err);
        console.error('login failed');
        this.fstate = false;
       },
    );

      this.loginForm.reset();
  }

}
