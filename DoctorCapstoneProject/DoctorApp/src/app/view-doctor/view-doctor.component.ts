import { Component } from '@angular/core';
import { IDoctor } from '../Interface/IDoctor';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent {

  doctors: IDoctor[] = [];
  showErr: any;
  successMessage: string | undefined;
  //  doctorId!: number;
  doctorId: number | undefined;
  
  constructor(private _doctor: DoctorService) { }
  ngOnInit() {
    this.getDoctor();
    
  
  }
  
    getDoctor() {
      this._doctor.getDoctor().subscribe({
        next: (data: IDoctor[]) => {
          this.doctors = data;
          if (this.doctors.length === 0) {
            this.showErr = true;
          }
          this._doctor.saveDoctorsToStorage(this.doctors);
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }

  deleteDoctor(doctorId: number) {
    debugger
    this._doctor.DeleteDoctor(doctorId).subscribe({
      next: () => {
        this.successMessage = 'Doctor deleted successfully.';
        this.getDoctor();
      },
      error: (error: any) => {
        console.log('Error occurred while deleting the doctor:', error);
      }
    });
  }



}

