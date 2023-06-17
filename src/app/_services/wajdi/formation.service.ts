import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/_models/formation';
@Injectable({
  providedIn: 'root'
})
export class FormationService {

    private apiUrl = 'http://localhost:8081/GestionDesAbsences/formations';

    constructor(private http: HttpClient) {}

    addFormation(Formation: Formation): Observable<Formation> {
        return this.http.post<Formation>(`${this.apiUrl}`, Formation);
    }

    updateFormation(Formation: Formation): Observable<Formation> {
        return this.http.put<Formation>(`${this.apiUrl}/${Formation.id}`, Formation);
    }

    getAllFormations(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    removeFormation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
