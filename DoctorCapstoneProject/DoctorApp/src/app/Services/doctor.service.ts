import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IDoctor } from '../Interface/IDoctor';
import { ISpecilization } from '../Interface/ISpecilization';
import { ISurgery } from '../Interface/ISurgery';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctors: IDoctor[] = [];
  specilization: ISpecilization[] = [];
  private doctorsKey = 'doctors';
  private surgerysKey = 'surgerys';
  private specilizationKey = 'specilizations'
  surgery: ISurgery[] = [];
  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
  getDoctor(): Observable<IDoctor[]> {
    let temp = this.http.get<IDoctor[]>('https://localhost:44320/api/CureWell/GetAllDoctor')
    return temp;
  }
  saveDoctorsToStorage(products: IDoctor[]) {
    localStorage.setItem(this.doctorsKey, JSON.stringify(products));
  }
  getSpecilization(): Observable<ISpecilization[]> {
    let temp = this.http.get<ISpecilization[]>('https://localhost:44320/api/CureWell/GetAllSpecilization')
    return temp;
  }
  saveSpecilizationsToStorage(specilizations: ISpecilization[]) {
    localStorage.setItem(this.doctorsKey, JSON.stringify(specilizations));
  }
  getSurgery(): Observable<ISurgery[]> {
    let temp = this.http.get<ISurgery[]>('https://localhost:44320/api/CureWell/GetAllSurgeryTypeForToday')
    return temp;
  }
  saveSurgerysToStorage(surgery: ISurgery[]) {
    localStorage.setItem(this.surgerysKey, JSON.stringify(surgery));
  }

  addDoctor(doctorName: string): Observable<boolean> {
    const url = "https://localhost:44320/api/CureWell/AddDoctor?doctorName=" + doctorName;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
  editDoctor(doctorId: number, doctorName: string): Observable<boolean> {   
    const url=`https://localhost:44320/api/CureWell/UpdateDoctor?doctorId=${doctorId}&doctorName=${doctorName}`;
    return this.http.patch<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }

  getDoctorItems(): IDoctor[] {
    let doctor: IDoctor[] = JSON.parse(localStorage.getItem(this.doctorsKey) || '[]');
    return doctor;
  }
  updateDoctor(updatedItem: IDoctor) {
    let doctor: IDoctor[] = this.getDoctorItems();
    const index = doctor.findIndex(item => item.doctorId === updatedItem.doctorId);
    if (index !== -1) {
      doctor[index] = updatedItem;
      localStorage.setItem(this.doctorsKey, JSON.stringify(this.doctorsKey));
    }
  }
  EditSurgeryTime(surgeryId: number, startTime: number, endTime: number): Observable<boolean> {
    const url = `https://localhost:44320/api/CureWell/UpdateSurgerysDate?surgeryId=${surgeryId}&startTime=${startTime}&endTime=${endTime}`;
    return this.http.patch<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
  DeleteDoctor(doctorId: number): Observable<boolean> {
    const url = `https://localhost:44320/api/CureWell/DeleteDoctor/${doctorId}`;
    return this.http.delete<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
}
