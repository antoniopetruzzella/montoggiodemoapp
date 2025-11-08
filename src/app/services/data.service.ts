// src/app/services/data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({ providedIn: 'root' })
export class DataService {
  //private baseUrl = 'https://montoggioget-853615419170.europe-west1.run.app';
  private baseUrl="https://montoggioget-565624036400.europe-west1.run.app"

  constructor(private http: HttpClient) {}

getContent(collezione: string) {
  const url = `${this.baseUrl}?collezione=${collezione}`;
  console.log('Chiamata a:', url);
  return this.http.get(url).pipe(
    tap(data => {
      console.log('Risposta ricevuta:', JSON.stringify(data));
    }),
    catchError(err => {
      console.error('Errore HTTP:', JSON.stringify(err));
      return throwError(() => err);
    }),
  finalize(() => {
    console.log('Chiamata completata o interrotta');
  })
  );
}


}
