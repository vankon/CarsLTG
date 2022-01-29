import { Component, OnInit } from '@angular/core';
import { CarFirebaseService } from '../shared/car-firebase.service';
import { IDictionary } from '../_models/cars.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  brands: IDictionary[] = [];
  bodyTypes: IDictionary[] = [];
  cars: any[] = [];

  constructor(
    private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    this.carService.getBrands()
      .subscribe((data: IDictionary[]) => {
        this.brands = data;
      });

    this.carService.getBodyType()
      .subscribe((data: IDictionary[]) => {
        this.bodyTypes = data;
      });

    this.carService.getCars()
      .subscribe((data: any[]) => {
        console.log(data);
        this.cars = data;
      });
  }

}
