import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router , private route: ActivatedRoute) { }

  ngOnInit() {
  }

  Logout() {
    this.router.navigate(['../login', {relativeTo: this.route}]);
    }
}
