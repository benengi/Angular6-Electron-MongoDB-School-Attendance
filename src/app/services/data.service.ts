import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user.entity';
import { Student } from '../../models/student.entity';
import { Class } from '../../models/class.entity';
import { Attendance2 } from '../../models/attendance2.entity';

@Injectable()
export class DataService {

  private eFaculty = new BehaviorSubject<User>(null);
  currentFaculty = this.eFaculty.asObservable();

  private logFaculty = new BehaviorSubject<String>(null);
  loggedFaculty = this.logFaculty.asObservable();

  private eStudent = new BehaviorSubject<Student>(null);
  currentStudent = this.eStudent.asObservable();

  private eClass = new BehaviorSubject<Class>(null);
  currentClass = this.eClass.asObservable();

  private attdate = new BehaviorSubject<String>(null);
  currentDate = this.attdate.asObservable();

  private attendance = new BehaviorSubject<Attendance2>(null);
  cuurentAttendance = this.attendance.asObservable();

  constructor() { }

  changeAttendance(att: Attendance2) {
    this.attendance.next(att);
  }
  changeDate(tdate: String) {
    this.attdate.next(tdate);
  }

  changeFaculty(tuser: User) {
    this.eFaculty.next(tuser);
  }

  changeStudent(tstudent: Student) {
    this.eStudent.next(tstudent);
  }

  changeClass(tclass: Class) {
    this.eClass.next(tclass);
  }

  changeLoggedFaculty(id: String) {
    this.logFaculty.next(id);
  }

}
