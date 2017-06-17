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
            .get('get-month', { search: params })
            .map(res => res.json())
            .catch((err: any) => {
                console.error("HTTP get failed");
                return Promise.reject(err.message || err)
            });
    }

    saveUserPreferences(preferences: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('save-user-preferences', JSON.stringify(preferences), {headers: headers}).subscribe(r=>{});
    }
}