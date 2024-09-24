import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth';
import { DataService } from './data.service';
import { Properties } from '../utilities/properties';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private header: HttpHeaders;
    constructor( private _http: HttpClient ) {
      this.header = new HttpHeaders({
        'Accept': 'application/json;charset=utf-8',
        'Content-Type': 'application/json;charset=utf-8',
      })
    }
  
    /**
    * Método encargado de obtener los headers necesarios para la ejecucion del servicio
    */
    protected getHeader() {
      var header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      return header;
  }
  /**
 * Funcion para realizar el login dentro de la aplicacion
 * @param auth Usuario a utenticar
 * @returns 0bservale con la informacion de autenticacion (token, token refresh) o si la autenticacion es correcta
 */
  public login(){
      const body = `grant_type=client_credentials&client_id=${Properties.SPOTIFY_CLIENT_ID}&client_secret=${Properties.SPOTIFY_CLIENT_SECRET}`;
  
      return this._http.post(Properties.SPOTIFY_TOKEN_URL, body, {headers: this.getHeader(), observe: 'response'})
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
