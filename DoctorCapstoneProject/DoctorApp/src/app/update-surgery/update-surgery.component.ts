import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-update-surgery',
  templateUrl: './update-surgery.component.html',
  styleUrls: ['./update-surgery.component.css']
})
export class UpdateSurgeryComponent {
  surgeryId: number | undefined;
  doctorId: number | undefined;
  surgeryDate: Date | undefined;
  startTime: number | undefined;
  endTime: number | undefined;
  surgeryCategory: string | undefined;
  successMessage: string | undefined;
  constructor(private router: Router, private route: ActivatedRoute, private _surgeryDoctor: DoctorService) {
    this.route.params.subscribe(params => {
      this.surgeryId = +params['surgeryId'];
      this.doctorId = +params['doctorId'];
      this.surgeryDate = new Date(params['surgeryDate']);
      this.startTime = +params['startTime'];
      this.endTime = +params['endTime'];
      this.surgeryCategory = params['surgeryCategory'];
    });

  }

  ngOnInit() {
   // this.UpdateSurgery();
  }
  UpdateSurgery() {
    debugger
    if (this.surgeryId && this.startTime && this.endTime) {
      this._surgeryDoctor.EditSurgeryTime(this.surgeryId, this.startTime, this.endTime).subscribe({
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
