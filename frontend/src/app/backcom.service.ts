import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consumption } from './backcom.model'; 

@Injectable({
  providedIn: 'root'
})
export class BackcomService {
  private apiUrl = 'http://localhost:3000/siiv'; 

  constructor(private http: HttpClient) {}

  getProductConsumption(): Observable<Consumption[]> {
    return this.http.get<Consumption[]>(this.apiUrl);
  }

  createProductConsumption(consumption: Consumption): Observable<Consumption> {
    return this.http.post<Consumption>(this.apiUrl, consumption);
  }

  updateProductConsumption(id: number, consumption: Consumption): Observable<Consumption> {
    return this.http.patch<Consumption>(`${this.apiUrl}/${id}`, consumption);
  }

  deleteProductConsumption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductConsumptionById(id: number): Observable<Consumption> {
    return this.http.get<Consumption>(`${this.apiUrl}/${id}`);
  }
}