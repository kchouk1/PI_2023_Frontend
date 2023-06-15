import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../_models/conge';

@Injectable({
    providedIn: 'root',
})
export class CongeService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/conge';

    constructor(private http: HttpClient) {}

    addConge(conge: Conge): Observable<Conge> {
        return this.http.post<Conge>(`${this.apiUrl}`, conge);
    }

    updateConge(conge: Conge): Observable<Conge> {
        return this.http.put<Conge>(
            `${this.apiUrl}updateConge/${conge.id}`,
            conge
        );
    }

    getAllConges(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    removeConge(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}`);
    }
}
