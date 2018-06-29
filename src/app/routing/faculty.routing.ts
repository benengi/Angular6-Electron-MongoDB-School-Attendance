import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FacultyComponent } from '../faculty/faculty.component';
import { FsignupComponent} from '../faculty/fsignup/fsignup.component';

export const facultyRoutes: Routes = [
   // {path: '', redirectTo: 'faculty', pathMatch: 'full'},
    { path: ''   , component: FacultyComponent},
    { path: 'newfaculty' , component: FsignupComponent }
];
