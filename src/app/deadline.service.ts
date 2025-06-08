import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

interface DeadlineResponse {
  secondsLeft: number;
}

@Injectable({ providedIn: 'root' })
export class DeadlineService {
  private readonly apiUrl = 'http://localhost:8000/deadline';

  constructor(private http: HttpClient) {}

  getDeadline(): Observable<DeadlineResponse> {
    return this.http.get<DeadlineResponse>(this.apiUrl);
  }

  //I have written this method for testing purpose
//   getDeadline(): Observable<{ secondsLeft: number }> {
//   return of({ secondsLeft: 120 }); // Temporary mock data
// }
}
