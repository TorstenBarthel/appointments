import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { EventColor } from 'calendar-utils';

import { Observable } from 'rxjs'
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  private _jsonURL = 'assets/data/data.json';

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL).pipe(
      delay(1500),
      map(data => {
        return data
      })
    );
  }
}

export const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}