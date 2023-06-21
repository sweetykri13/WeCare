import { Component } from '@angular/core';
import { ISpecilization } from '../Interface/ISpecilization';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-view-specilization',
  templateUrl: './view-specilization.component.html',
  styleUrls: ['./view-specilization.component.css']
})
export class ViewSpecilizationComponent {
  specilization: ISpecilization[] = [];
  showErr: any;
  constructor(private _specilization: DoctorService) { }
  
  ngOnInit() {
    this.getSpecilization();
  }
  getSpecilization() {
    this._specilization.getSpecilization().subscribe({
      next: (data: ISpecilization[]) => {
        this.specilization = data ;
        if (this.specilization.length === 0) {
          this.showErr = true;
        }
        console.log("abcd", this.specilization)
        this._specilization.saveSpecilizationsToStorage(this.specilization);
      },
      error: (error: any) => { console.log(this.showErr) }
    })
  }
}
