import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Version } from './backcom.model'; 

@Injectable({
  providedIn: 'root'
})
export class BackcomService {
  private apiUrl = 'http://localhost:3000/siiv'; 

  constructor(private http: HttpClient) {}

  getversion(): Observable<Version[]> {
    return this.http.get<Version[]>(this.apiUrl);
  }

  createversion(Version: Version): Observable<Version> {
    return this.http.post<Version>(this.apiUrl, Version);
  }

  updateversion(Version: Version): Observable<Version> {
    return this.http.patch<Version>(`${this.apiUrl}/${Version.id}`, Version);
  }

  deleteversion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}