import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  static url = 'https://carsltg-default-rtdb.firebaseio.com/Marks';

  constructor(private http: HttpClient) { }

  test(): Observable<any> {
    return this.http.get<any>(`${CarsService.url}.json`)
      .pipe(map(marks => {
        if (!marks) {
          return []
        }
        return Object.keys(marks).map(key => ({ ...marks[key], id: key }))
      })

      );
  }
}
