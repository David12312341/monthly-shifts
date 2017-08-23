import { Injectable } from '@angular/core';
import { ShiftsSelection } from "app/shifts-selection";
import { Jsonp, URLSearchParams, Http, Headers } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
    constructor(private http: Http) { }

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
        this.http.post('dal/publish', JSON.stringify(poll), { headers: headers }).subscribe(r => { });
    }

    saveUserPreferences(preferences: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('dal/save-user-preferences', JSON.stringify(preferences), { headers: headers }).subscribe(r => { });
    }

    loadUserPreferences(name: string) {
        let params = new URLSearchParams();
        params.set("name", name);
        return this.http
            .get('dal/get-month', { search: params })
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }
}