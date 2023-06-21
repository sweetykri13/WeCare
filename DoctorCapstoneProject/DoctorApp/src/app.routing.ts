import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ViewDoctorComponent } from './app/view-doctor/view-doctor.component';
import { ViewSpecilizationComponent } from './app/view-specilization/view-specilization.component';
import { TodaysSurgeryComponent } from './app/todays-surgery/todays-surgery.component';
import { AddDoctorComponent } from './app/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './app/update-doctor/update-doctor.component';
import { UpdateSurgeryComponent } from './app/update-surgery/update-surgery.component';

const routes: Routes = [
  
  { path: '', component: ViewDoctorComponent },
  { path: 'viewdoctor', component: ViewDoctorComponent },
  { path: 'viewSpecilization', component: ViewSpecilizationComponent },
  { path: 'viewSurgery', component: TodaysSurgeryComponent },
  { path: 'addDoctor', component: AddDoctorComponent },
  { path: 'updateDoctor/:doctorId', component: UpdateDoctorComponent },
  { path: 'updateSurgery/:surgeryId/:doctorId/:surgeryDate/:startTime/:endTime/:surgeryCategory', component: UpdateSurgeryComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
