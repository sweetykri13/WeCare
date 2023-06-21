import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { ViewSpecilizationComponent } from './view-specilization/view-specilization.component';
import { TodaysSurgeryComponent } from './todays-surgery/todays-surgery.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorService } from './Services/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app.routing';
import { FormsModule } from '@angular/forms';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { UpdateSurgeryComponent } from './update-surgery/update-surgery.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ViewDoctorComponent,
    ViewSpecilizationComponent,
    TodaysSurgeryComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    UpdateSurgeryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
