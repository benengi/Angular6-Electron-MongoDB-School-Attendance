import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, take , catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders , HttpErrorResponse , HttpParams} from '@angular/common/http';
import { User } from '../../models/user.entity.js';
import { Class } from '../../models/class.entity.js';
import { Student} from '../../models/student.entity';
import { AddStudent } from '../supporters/addStudent.class.js';
import { Attendance } from '../../models/attendance.entity.js';
import { Detail } from '../../models/detail.entity.js';
import { Attendance2 } from '../../models/attendance2.entity.js';
import { RAttendance } from '../supporters/Rattendance.class.js';



@Injectable()
export  class School2Service {

  constructor(private http: HttpClient) { }


  getReport(dt: String) {
    console.log(dt);
    return this.http.get('http://localhost:9090/api/attendance/getreport/' + dt)
    .pipe(
     map( (res: any) => {
       const attendanceGot: RAttendance = res;
      //  console.log(res);
          return attendanceGot;
     }
      ));
  }
    viewAttendance(dt: String) {
      console.log(dt);
      return this.http.get('http://localhost:9090/api/attendance/viewattendance/' + dt)
      .pipe(
       map( (res: any) => {
          const attendanceGot: Attendance2 = res;
       //   console.log(res);
            return attendanceGot;
       }
        ));
    }

    putAttendanceDetail(atid: String, detailid: String) {

     const tbody = { attid: atid , detid: detailid};

      const body = JSON.stringify(tbody);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.put('http://localhost:9090/api/attendance/insertdetail', body, httpOptions);
      // .pipe(catchError(this.handleError));
    }

    putDetail(det: Detail) {
      const body = JSON.stringify(det);
          const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };
      return this.http.post('http://localhost:9090/api/attendance/putdetail', body, httpOptions)
      .pipe(
        map( (res: any) => {
            const detailsGot: Detail = res.obj;
          return detailsGot;
        }
         ));
    }
    putAttendance(att: Attendance) {
      const body = JSON.stringify(att);
          const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };
      return this.http.post('http://localhost:9090/api/attendance/putattendance', body, httpOptions);
    }

    createAttendance(att: Attendance) {
      const body = JSON.stringify(att);
      const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })
   };
  return this.http.post('http://localhost:9090/api/attendance/createattendance', body, httpOptions)
  .pipe(
    map( (res: any) => {
        const attGot: Attendance = res.obj;
      return attGot;
    }
     ));
    }

    removeStudent(std: Student, id: String) {
        const body = JSON.stringify(std);
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
        return this.http.put('http://localhost:9090/api/class/removeStudent/' + id, body, httpOptions);
    }

    getClassStudents(id: String) {
return this.http.get('http://localhost:9090/api/class/getStudents/' + id)
.pipe(
    map((res: any) => {
     console.log('RES');
    console.log(res);
         const classGot: Class = res;
         return classGot;
    }
     ));
    }

    addStudent(tadd: AddStudent) {
console.log(tadd);
        const body = JSON.stringify(tadd);
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
return this.http.put('http://localhost:9090/api/class/addStudent', body, httpOptions);
// .pipe(catchError(this.handleError));
    }

}
