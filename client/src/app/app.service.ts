import { Injectable } from '@angular/core';
import { ShiftsSelection } from "app/shifts-selection";
import { Jsonp, URLSearchParams, Http, Headers } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ShiftAssignments } from "app/models/shift-assignments";

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    loadShiftAssignments(pollId: string): Observable<ShiftAssignments> {
        let params = new URLSearchParams();
        params.set("pollId", pollId);
        return this.http.get('dal/load-shift-assignments', { search: params })
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed.");
                console.error(err);
                return Promise.reject(err.message || err)
            });
    }

    getMonth(year: number, month: number): Observable<any> {
        let params = new URLSearchParams();
        params.set("year", year.toString());
        params.set("month", month.toString());
        return this.http
            .get('dal/get-month', { search: params })
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }

    loadPolls(): Observable<any> {
        return this.http
            .get('/dal/get-polls')
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }

    publishPoll(poll: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('dal/publish-poll', JSON.stringify(poll), { headers: headers }).subscribe(r => { });
    }

    saveUserPreferences(preferences: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('dal/save-user-preferences', JSON.stringify(preferences), { headers: headers }).subscribe(r => { });
    }

    loadAllUserPreferences() {
        return this.http.get('dal/load-user-preferences')
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }

    loadUserPreferences(pollId: string) {
        return this.http.get('dal/load-user-preferences', { search: { "pollId": pollId } })
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }

    publishAssignments(assignments: ShiftAssignments) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('dal/publish-assignments', JSON.stringify(assignments), { headers: headers }).subscribe(r => { });
    }
}