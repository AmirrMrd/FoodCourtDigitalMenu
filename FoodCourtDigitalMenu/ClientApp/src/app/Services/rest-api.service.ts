import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

// import { SettingModel } from 'src/models/setting.model';
// import { LocalStoreManager } from './local-store-manager.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
// const headers = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/octet-stream;' })
// }
@Injectable({
    providedIn: 'root'
})
export class RestApiService<T> {
    apiUrl: string;
    // setting: SettingModel;
    // protected storage: LocalStoreManager;
    // accessToken:string='';
    constructor(private http: HttpClient) {
    //    this.apiUrl = "http://192.168.247.50:14000";
        this.apiUrl = environment.baseUrl || this.baseUrl();
    }
    public baseUrl() {
        let base = '';

        if (window.location.origin) {
            base = window.location.origin;
        } else {
            base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        return base.replace(/\/$/, '');
    }
    getToken<T>(data: any): Observable<any> {
        const fullUrl = `${this.apiUrl}Token`;
        const a = JSON.stringify(data);
        return this.http.post<T>(fullUrl, JSON.stringify(data), httpOptions);
    }
    get(): Observable<any> {
        const fullUrl = `${this.apiUrl}`;
        return this.http.get(fullUrl, httpOptions);
  }
  
    testConnection<T>(testUrl: string, CntUrl: string): Observable<any> {
        const fullUrl = `${testUrl}${CntUrl}`;
        return this.http.get<T>(fullUrl, httpOptions);
    }

    getEntity<T>(CntUrl: string): Observable<any> {
        const fullUrl = `${this.apiUrl}/${CntUrl}`;
        return this.http.get<T>(fullUrl, httpOptions);
    }

    getWaiterList<T>(CntUrl: string): Observable<any> {
        const fullUrl = `${this.apiUrl}${CntUrl}`;
        return this.http.get<T>(fullUrl, httpOptions);
    }

    getFilterEntity<T>(CntUrl: string, filter: any): Observable<any> {
        const fullUrl = `${this.apiUrl}/${CntUrl}?Filter=${filter}`;
        return this.http.get<T>(fullUrl, httpOptions);
    }

    getEntityById<T>(CntUrl: string, id: number): Observable<any> {
        const url = `${this.apiUrl}${CntUrl}/${id}`;
        return this.http.get<T>(url, httpOptions);
    }

    postEntity<T>(data:any, CntUrl: string): Observable<any> {
        const fullUrl = `${this.apiUrl}/${CntUrl}`;
        const jason = JSON.stringify(data);
        return this.http.post<T>(fullUrl, jason, httpOptions);
    }

    updateEntity<T>(id: string, data:any, CntUrl: string): Observable<any> {
        const url = `${this.apiUrl}${CntUrl}/${id}`;
        return this.http.put<T>(url, data, httpOptions);
    }

    deleteEntity<T>(id: string, CntUrl: string): Observable<T> {
        const url = `${this.apiUrl}${CntUrl}/${id}`;
        return this.http.delete<T>(url, httpOptions);
    }
    upload<T>(data:any, CntUrl: string): Observable<any> {
        const headers = new HttpHeaders().set("Content-Type", "multipart/form-data");
        const options = { headers: headers};
        const fullUrl = `${this.apiUrl}/${CntUrl}`;
        return this.http.post<T>(fullUrl, data , options);
    }
      
    getImage<T>(CntUrl: string): Observable<T> {
        const headers = new HttpHeaders().set("Accept", "image/png");
        const options = { headers: headers, responseType: "blob" as "json" };
        const url = `${this.apiUrl}${CntUrl}`;
        return this.http.get<T>(url, options);
      }
}
