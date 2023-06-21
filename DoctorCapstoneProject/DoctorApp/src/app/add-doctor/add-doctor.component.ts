import { Component } from '@angular/core';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {

  doctorName: string | undefined;
  successMessage: string | undefined;
  constructor(private _addDoctor: DoctorService) { }
  ngOnInit() {
   // this.AddDoctor();
  }

  AddDoctor() {
    if (this.doctorName !== undefined) {
      this._addDoctor.addDoctor(this.doctorName).subscribe({
        next: (result: boolean) => {
          this.successMessage = 'Doctor added successfully.';
        },
        error: (error: any) => {
          console.log('Error occurred while adding the doctor:', error);
        }
      });
    } else {
      alert('Please enter a valid doctor name.');
    }
  }
}
