import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ClassComponent } from './class/class.component';
import { FacultyComponent } from './faculty/faculty.component';
import { StudentComponent } from './student/student.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { facultyRoutes } from './routing/faculty.routing';
import { FsignupComponent } from './faculty/fsignup/fsignup.component';
import { CsignupComponent } from './class/csignup/csignup.component';
import { SsignupComponent } from './student/ssignup/ssignup.component';
import { CeditComponent } from './class/cedit/cedit.component';
import { FeditComponent } from './faculty/fedit/fedit.component';
import { SeditComponent } from './student/sedit/sedit.component';
import { AddStudentComponent } from './class/cedit/add-student/add-student.component';
import { PutattendanceComponent } from './attendance/putattendance/putattendance.component';
import { ViewattendanceComponent } from './attendance/viewattendance/viewattendance.component';
import { ReportComponent } from './report/report.component';

export const homeRoutes: Routes = [
    {path: '', redirectTo: 'faculty', pathMatch: 'full'},
    { path: 'report'   , component: ReportComponent},
    { path: 'class'   , component: ClassComponent},
    { path: 'class/newclass'   , component: CsignupComponent},
    { path: 'class/editclass'   , component: CeditComponent},
    { path: 'class/editclass/addstudent'   , component: AddStudentComponent},
    { path: 'faculty' , component: FacultyComponent },
    { path: 'faculty/newfaculty' , component: FsignupComponent },
    { path: 'faculty/editfaculty' , component: FeditComponent },
    { path: 'student'   , component: StudentComponent},
    { path: 'student/newstudent'   , component: SsignupComponent},
    { path: 'student/editstudent'   , component: SeditComponent},
    { path: 'attendance'   , component: AttendanceComponent},
    { path: 'attendance/putattendance'   , component: PutattendanceComponent},
    { path: 'attendance/viewattendance'   , component: ViewattendanceComponent},
    { path: 'home'   , component: ClassComponent},
];
