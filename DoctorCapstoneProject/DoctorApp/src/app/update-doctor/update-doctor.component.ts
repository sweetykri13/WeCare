import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDoctor } from '../Interface/IDoctor';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent {

  doctorId: number | undefined;
  doctorName: string | undefined;
  successMessage: string | undefined;
  doctor: IDoctor | undefined;

  constructor(private route: ActivatedRoute, private _updateDoctor: DoctorService) { 
    this.route.params.subscribe(params => {
      this.doctorId = +params['doctorId'];
      this.doctorName = params['doctorName'];
    });
  }
  ngOnInit() {
    this.updateDoctor();
  }

  updateDoctor() {
    debugger
    if (this.doctorId && this.doctorName) {
      this._updateDoctor.editDoctor(this.doctorId, this.doctorName).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.successMessage = 'Doctor updated successfully.';
          } else {
            this.successMessage = 'Failed to update doctor.';
          }
        },
        error: (error: any) => {
          console.log('Error occurred while updating the doctor:', error);
        }
      });
    } else {
      console.log('Please provide valid doctor ID and name.');
    }
  }
}
