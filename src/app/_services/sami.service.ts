import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, toArray } from 'rxjs';
import { Car } from '../_models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class SamiService {
  static url = 'http://almond-platform.com:7015/auto-market/landing-page?user-id=3';

  constructor(
    private http: HttpClient
  ) {
  }

  getData() {
    const body = {
      "action": "",
      "location_id": 71,
      "location_type": "COUNTRY",
      "type": "AD",
      "user_id": 1
    }

    return this.http.post(`${SamiService.url}`, body)
      .pipe(
        map((x: any) => {
          return x.best_selling_car_models
            .filter((x: any) => x.vehicle.picture_url)
            .map((item: any) => {
              const model: Car = {
                id: item.vehicle.id,
                name: item.vehicle.model_name,
                image: item.vehicle.picture_url,
                year: new Date(item.year, 0),
                brand_image: item.vehicle.make?.logo_url,
                best_selling: false,
                is_canada: false,
                most_selling: false,
                most_visited: false,
              }
              return { ...model }
            }
            )
        })
      );
  }
}
