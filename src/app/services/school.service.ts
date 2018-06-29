import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, take , catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { User } from '../../models/user.entity.js';
import { Class } from '../../models/class.entity.js';
import { Student} from '../../models/student.entity';
@Injectable()
export  class SchoolService {
    private BASE_URL = 'http://localhost:9090/api/user/insert';
    constructor(private http: HttpClient) { }

    getClass(id: String) {
      return this.http.get('http://localhost:9090/api/class/findClass/' + id)
      .pipe(
       map( (res: any) => {
            const ClassGot: Class  = res;
            return ClassGot;
       }
        ));
   }

getStudent(id: String) {
  return this.http.get('http://localhost:9090/api/student/findstudent/' + id)
  .pipe(
   map( (res: any) => {
        const studentGot: Student = res;
        return studentGot;
   }
    ));
}
editStudent(tstudent: Student) {
  console.log(tstudent);
  const body = JSON.stringify(tstudent);
//   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
return this.http.put('http://localhost:9090/api/student/edit', body, httpOptions);
// .pipe(catchError(this.handleError));
}

deleteStudent(id: String) {
  return this.http.delete('http://localhost:9090/api/student/' + id)
  .pipe(map((res: any) => {
      return res;
  } ));
}

deleteClass(id: String) {
  return this.http.delete('http://localhost:9090/api/class/' + id)
  .pipe(map((res: any) => {
      return res;
  } ));
}

    findAllFaculty() {
        return this.http.get('http://localhost:9090/api/user/findAllFaculty')
        .pipe(
         map( (res: any) => {
          console.log('RES');
          console.log(res);
              const usersGot: User[] = res;
              return usersGot;
         }
          ));
     }

     findAllStudent() {
      return this.http.get('http://localhost:9090/api/student/findAllStudent')
      .pipe(
       map( (res: any) => {
            const studentsGot: Student[] = res;
            return studentsGot;
       }
        ));
   }

     findAllClass() {
      return this.http.get('http://localhost:9090/api/class/findAllClass')
      .pipe(
       map( (res: any) => {
            const ClassesGot: Class[] = res;
            return ClassesGot;
       }
        ));
   }

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

}
