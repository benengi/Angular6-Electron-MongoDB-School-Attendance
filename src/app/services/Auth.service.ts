import { User } from '../../models/user.entity';
import {Student } from '../../models/student.entity';
import {Class } from '../../models/class.entity';
import { Injectable } from '@angular/core';
import {  Headers, Http, Response } from '@angular/http';
import { Observable , throwError} from 'rxjs';
import { Attendance } from '../../models/attendance.entity';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpResponse, HttpClientModule} from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

private students: Student[] = [];
private classes: Class[] = [];
private staffid: String;


 private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  editFaculty(tuser: User) {
    console.log(tuser);
        const body = JSON.stringify(tuser);
     //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.put('http://localhost:9090/api/user/edit', body, httpOptions)
     .pipe(catchError(this.handleError));
  }

  editFacultypass(tuser: User) {
    console.log(tuser);
        const body = JSON.stringify(tuser);
     //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.put('http://localhost:9090/api/user/editpass', body, httpOptions)
     .pipe(catchError(this.handleError));
  }

  deleteFaculty(id: String) {
    return this.http.delete('http://localhost:9090/api/user/' + id)
    .pipe(map((res: any) => {
        return res;
    } ));
  }


    signUp(user: User) {
        console.log(user);
        const body = JSON.stringify(user);
     //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.post('http://localhost:9090/api/user/signup', body, httpOptions)
     .pipe(catchError(this.handleError));
    }

    StudentsignUp(tstudent: Student) {
      console.log(tstudent);
      const body = JSON.stringify(tstudent);
   //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   return this.http.post('http://localhost:9090/api/student/signup', body, httpOptions);
  // .pipe(catchError(this.handleError));
  }

    signIn(user: User) {
        const body = JSON.stringify(user);
     //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.post('http://localhost:9090/api/user/signIn', body, httpOptions)
     .pipe(catchError(this.handleError));
        }
/*
        findAllFaculty() {
          return this.http.get<User[]>('http://localhost:9090/api/user/findAllFaculty')
          .pipe(
           map( data => {
               return data;
            }),
             catchError(this.handleError));
      }
*/
      findAllFaculty() {
        return this.http.get('http://localhost:9090/api/user/findAllFaculty')
        .pipe(
         map( (res: any) => {
              const usersGot: User[] = res;
              return usersGot;
         }
          ));
     }

    classsignUp(tclass: Class) {
      console.log(tclass);
      const body = JSON.stringify(tclass);
   //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
   return this.http.post('http://localhost:9090/api/class/signup', body, httpOptions)
   .pipe(catchError(this.handleError));
  }
}
