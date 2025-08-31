// src/app/services/data.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl = 'https://montoggioget-853615419170.europe-west1.run.app';

  constructor(private http: HttpClient) {}

  getContent(collezione: string) {
    return this.http.get(`${this.baseUrl}?collezione=${collezione}`);
  }
}
