import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { UploadReportPageComponent } from './pages/upload-report-page/upload-report-page.component';
import { DecryptReportPageComponent } from './pages/decrypt-report-page/decrypt-report-page.component';
import { ViewReportsPageComponent } from './pages/view-reports-page/view-reports-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'doctor',
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['DOCTOR'] }
  },
  {
    path: 'doctor/upload',
    component: UploadReportPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['DOCTOR'] }
  },
  {
    path: 'patient',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PATIENT'] }
  },
  {
    path: 'patient/reports',
    component: ViewReportsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PATIENT'] }
  },
  {
    path: 'patient/decrypt',
    component: DecryptReportPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PATIENT'] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

