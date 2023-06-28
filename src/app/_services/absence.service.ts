import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from '../_models/absence';

@Injectable({
    providedIn: 'root',
})
export class AbsenceService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/abscences';

    constructor(private http: HttpClient) {}

    getAllAbsences(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getCurrentMonthAbsences(): Observable<any> {
        return this.http.get(`${this.apiUrl}/current`);
    }

    addAbsence(absence: Absence): Observable<Absence> {
        return this.http.post<Absence>(`${this.apiUrl}/create`, absence);
    }

    updateAbsence(absence: Absence): Observable<Absence> {
        return this.http.put<Absence>(
            `${this.apiUrl}/update/${absence.id}`,
            absence
        );
    }

    deleteAbsence(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
