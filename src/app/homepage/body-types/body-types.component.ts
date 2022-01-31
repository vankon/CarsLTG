import { Component, OnInit } from '@angular/core';
import { BaseDictionary } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';

@Component({
  selector: 'app-body-types',
  templateUrl: './body-types.component.html',
  styleUrls: ['./body-types.component.scss']
})
export class AppBodyTypeComponent implements OnInit {
  bodyTypes: BaseDictionary[] = [];

  constructor(private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    this.carService.getBodyType()
      .subscribe((data: BaseDictionary[]) => {
        this.bodyTypes = data;
      });
  }
}
