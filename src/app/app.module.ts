import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AuthService } from './services/Auth.service';
import { School2Service } from './services/school2.service';
import { SchoolService } from './services/school.service';
import { DataService } from './services/data.service';
import { FilterPipe } from './pipes/filter.pipe';
import { ClassFilterPipe } from './pipes/classfilter.pipe';
import { AdfilterPipe } from './pipes/adfilter.pipe';
import { AttendanceComponent } from './attendance/attendance.component';
import { PutattendanceComponent } from './attendance/putattendance/putattendance.component';
import { ViewattendanceComponent } from './attendance/viewattendance/viewattendance.component';
import { ClassComponent } from './class/class.component';
import { CeditComponent } from './class/cedit/cedit.component';
import { CsignupComponent } from './class/csignup/csignup.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { StudentComponent } from './student/student.component';
import { FsignupComponent } from './faculty/fsignup/fsignup.component';
import { FeditComponent } from './faculty/fedit/fedit.component';
import { SsignupComponent } from './student/ssignup/ssignup.component';
import { SeditComponent } from './student/sedit/sedit.component';
import { AddStudentComponent } from './class/cedit/add-student/add-student.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ClassFilterPipe,
    AdfilterPipe,
    AttendanceComponent,
    PutattendanceComponent,
    ViewattendanceComponent,
    ClassComponent,
    CeditComponent,
    CsignupComponent,
    FacultyComponent,
    HomeComponent,
    LoginComponent,
    ReportComponent,
    StudentComponent,
    FsignupComponent,
    FeditComponent,
    SsignupComponent,
    SeditComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthService,
    School2Service,
    SchoolService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
