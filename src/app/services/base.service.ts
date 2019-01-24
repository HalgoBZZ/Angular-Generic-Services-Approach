import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {

    constructor(public http: HttpClient, public router: Router) {
    }

    protected callServiceMethodPost(methodName: string, body: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: headers };
        return this.http
            .post(environment.apiUrl + methodName, body, options);
        //      .pipe(map(this.extractData))
        //      .pipe(catchError(this.handleError.bind(this)));
    }


    protected callServiceMethodPostByQuery(methodName: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: headers };
        return this.http
            .post(environment.apiUrl + methodName, options);
        //      .pipe(map(this.extractData))
        //      .pipe(catchError(this.handleError.bind(this)));
    }


    protected callServiceMethodPut(methodName: string, body: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: headers };
        return this.http
            .put(environment.apiUrl + methodName, body);
        //      .pipe(map(this.extractData))
        //      .pipe(catchError(this.handleError.bind(this)));
    }


    protected callServiceMethodGet(methodName: string) {
        const headers = new HttpHeaders();
        const options = { headers: headers };
        return this.http
            .get(environment.apiUrl + methodName, options);
        //      .pipe(map((data: any) => {
        //        data
        //       } ),
        //     catchError(error => { return throwError('Its a Trap!')})
        // );
    }


    protected extractData(res: any) {
        console.log(res);
        console.log(res.json());
        return res.json() || {};
    }


    protected handleError(error: any) {
        console.log(error);
        const details = error.json();

        let message = 'Interner Server Fehler.';
        if (details.message) {
            message = details.message;
        } else if (details[0] && details[0].message) {
            message = details[0].message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (error.status === 404) {
                message = 'Backend Server nicht verfügbar.';
            }
            if (error.status === 401) {
                message = 'Session ist abgelaufen, bitte starten Sie die App neu!';
            } else {
                if (error.status === 0 && !error.statusText) {
                    message = 'Verbindung abgebrochen!';
                } else {
                    message = (error.message) ? error.message : (error.status) ? `${error.status} - ${error.statusText}` : message;
                }
            }
        }

        // TODO: Wait to receive specific code from PH backend for this exception to be handled
        if (message === 'Read timed out') {
            message = 'Bei der Ermittlung Ihrer Daten kam es zu einem Timeout. Bitte versuchen Sie es erneut.';
        }
        return throwError(error);
    }
}
