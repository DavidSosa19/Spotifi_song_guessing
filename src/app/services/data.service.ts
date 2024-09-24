import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(protected http: HttpClient) {
   }


  protected getContentHeader() {
      var header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      return header
  }

  private getTokenHeader(auth:string){
      var header = new HttpHeaders({'Authorization': `Bearer ${auth}`});
      return header
  }

  /**
   * Función para obtener datos dado una url y un token
   *
   * @param url path a consultar el servicio web
   */
  public get(url: string, auth: string): Observable<any> {
    return (
      this.http.get(url, { headers: this.getTokenHeader(auth), observe: 'response' })
        .pipe(catchError(this.handleError))
    );
  }

  protected post(url: string, params: any, auth: string): Observable<any> {
    const body = JSON.stringify(params);
    return this.http
      .post(url, body, { headers: this.getTokenHeader(auth), observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  protected put(url: string, params: any, auth: string): Observable<any> {
    const body = JSON.stringify(params);

    return this.http
      .put(url, body, { headers: this.getTokenHeader(auth), observe: 'response' })
      .pipe(catchError(this.handleError));
  }


  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error}`
      );

    }
    // throw error;
    // return an observable with a user-facing error message
    return throwError(() => error);
  }
}
