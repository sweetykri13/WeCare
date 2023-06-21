import { Component } from '@angular/core';
import { ISurgery } from '../Interface/ISurgery';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-todays-surgery',
  templateUrl: './todays-surgery.component.html',
  styleUrls: ['./todays-surgery.component.css']
})
export class TodaysSurgeryComponent {
  surgerys: ISurgery[] = [];
  surgeryId: number | undefined; 
  showError: any;
  constructor(private _surgery: DoctorService) { }
  ngOnInit() { this.getSurgery(); }
  getSurgery() {
    this._surgery.getSurgery().subscribe({
      next: (data: ISurgery[]) => {
        this.surgerys = data;
        if (this.surgerys.length == 0) {
          this.showError = true;
        }
        this._surgery.saveSurgerysToStorage(this.surgerys);
        error: (error: any) => {
          console.log(this.showError);
        }
      }

    })
  }
}
