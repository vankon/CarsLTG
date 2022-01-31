import { Component, OnInit } from '@angular/core';
import { BaseDictionary } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class AppBrandsComponent implements OnInit {
  brands: BaseDictionary[] = [];

  constructor(private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    this.carService.getBrands()
      .subscribe((data: BaseDictionary[]) => {
        this.brands = data;
      });
  }
}
