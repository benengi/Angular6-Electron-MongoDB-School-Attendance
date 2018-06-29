import { Component, OnInit, Input } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from '../../../models/user.entity';
import {AuthService} from '../../services/Auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-fedit',
  templateUrl: './fedit.component.html',
  styleUrls: ['./fedit.component.css']
})
export class FeditComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute, private dataservice: DataService) { }

  tuser: User;
  signUpForm: FormGroup;
  genders = ['male', 'female'];
  fstate = true;

  @Input() eFaculty: User;

  ngOnInit() {
        this.dataservice.currentFaculty.subscribe( tuser => this.eFaculty = tuser );
        console.log(this.eFaculty);
    this.signUpForm = new FormGroup({
      'staffid': new FormControl(this.eFaculty.staffid, Validators.required),
      'password': new FormControl(this.eFaculty.password, Validators.required),
      'name': new FormControl(this.eFaculty.name, Validators.required),
      'dateofbirth': new FormControl(this.eFaculty.dateofbirth, Validators.required),
      'gender': new FormControl(this.eFaculty.staffid, Validators.required),
      'email': new FormControl(this.eFaculty.email, [ Validators.required, Validators.email]),
      'phonenumber': new FormControl(this.eFaculty.phonenumber, Validators.required)
    });
  }


makeEdit() {
  const k = this.signUpForm.value;
  const user = new User(this.eFaculty._id, k.staffid, k.password ,
    k.name, new Date(k.dateofbirth), k.gender, k.email, k.phonenumber);

   this.authservice.editFaculty(user)
    .subscribe(data => console.log(user));

    if (this.eFaculty.password !== k.password) {
        this.authservice.editFacultypass(user)
        .subscribe(data => console.log(data));
    }

  this.signUpForm.reset();
  this.router.navigate(['../'], {relativeTo: this.route});

}

}
