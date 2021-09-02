import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ElementData } from './ElementData';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private fileUrl = 'http://localhost:4200/assets/database/element.json'

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<ElementData[]> {
    return this.http.get<ElementData[]>(this.fileUrl)
      .pipe(
        catchError(this.handleError('getData', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
