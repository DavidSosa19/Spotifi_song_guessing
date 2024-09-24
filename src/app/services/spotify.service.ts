import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { DataService } from './data.service';
import { Properties } from '../utilities/properties';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService extends DataService{


  constructor(protected http: HttpClient) {
    super(http);
    }
    
        /**
       * Funcion para consultar los items
       * 
       * @param filter filtro a pasar a la peticion
       */
        getItems(filter: string, token: string) {
            filter = (filter && filter.length > 0) ? `?q=${filter}&type=track` : '';
            let url = `${Properties.SPOTIFY_SEARCH_URL}${filter}`;
        
            return this.get(url, token);
          }
        
        getArtists(filter: string, token: string) {
          filter = (filter && filter.length > 0) ? `?q=${filter}&type=artist` : '';
          let url = `${Properties.SPOTIFY_SEARCH_URL}${filter}`;
      
          return this.get(url, token);
        }

        getArtist(filter: string, token: string) {
          filter = (filter && filter.length > 0) ? `?q=${filter}&type=track` : '';
          let url = `${Properties.SPOTIFY_SEARCH_URL}${filter}`;
      
          return this.get(url, token);
        }
    }