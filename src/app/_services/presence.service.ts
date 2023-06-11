import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presence } from '../_models/presence';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PresenceService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/weekentries/';

    constructor(private http: HttpClient) {}

    addPresence(presence: Presence): Observable<Presence> {
        return this.http.post<Presence>(`${this.apiUrl}`, presence);
    }

    updatePresence(presence: Presence): Observable<Presence> {
        return this.http.put<Presence>(
            `${this.apiUrl}updatePresence/${presence.id}`,
            presence
        );
    }

    getAllPresence(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    removePresence(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}`);
    }
}
