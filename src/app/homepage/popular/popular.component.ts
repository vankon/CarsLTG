import { Component, OnInit } from '@angular/core';
import { BaseDictionary, Car } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class AppPopularComponent implements OnInit {
  cars: any[] = [];

  constructor(private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    this.getCarList('is_canada');
  }

  private getCarList(type: string) {
    this.cars = [];
    this.carService.getCars(type)
      .subscribe((data: Car[]) => {
        this.cars = data;
      });
  }
}
