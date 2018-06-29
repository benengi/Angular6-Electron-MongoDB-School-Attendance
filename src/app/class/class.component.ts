import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {SchoolService } from '../services/school.service';
import { Class } from '../../models/class.entity';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  classes: Class[] = [];
  standards: Number[] = [];
  dstandards: Number[] = [];
  years: Number[] = [];
  standardValue: Number;
  yearValue: Number;
  constructor(private router: Router, private route: ActivatedRoute ,
    private schoolservice: SchoolService, private dataservice: DataService) { }
  searchText: String;
  ngOnInit() {

    this.schoolservice.findAllClass()
 .subscribe( (tclass: Class[]) => {
          //  tslint:disable-next-line:prefer-const
          for (let k of tclass) {
            this.classes.push(new Class(k._id , null, k.standard, k.section, k.year));

            if (! this.standards.includes(k.standard)) {
                   this.standards.push(k.standard);
            }

            if (! this.years.includes(k.year)) {
              this.years.push(k.year);
       }
         }
});
this.standards = this.standards.sort();
this.years = this.years.sort();
this.setClasses();
}

setClasses() {
  console.log('s:' + this.standardValue + 'y:' + this.yearValue);
  console.log('change');
  this.dstandards = [];
  // tslint:disable-next-line:prefer-const
  for (let cls of this.classes) {
    // tslint:disable-next-line:triple-equals
    if (this.yearValue == cls.year && !this.dstandards.includes(cls.standard)) {
        this.dstandards.push(cls.standard);
    }
  }
  console.log(this.dstandards);
}


classfilter() {
console.log(this.standardValue);
}


  AddClass() {
    this.router.navigate(['newclass'], {relativeTo: this.route});
  }

  editClass(tclass: Class) {
      console.log(tclass);
      this.dataservice.changeClass(tclass);
      this.router.navigate(['editclass'], {relativeTo: this.route});
  }

  deleteClass(id: String) {
    if (confirm('Are you sure you want to permanently delete this record')) {
      console.log(id);
      this.schoolservice.deleteClass(id)
        .subscribe(res => console.log(res));
    }
  }

}
