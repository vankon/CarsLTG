import { Component, OnInit } from '@angular/core';
import { BaseDictionary, Car } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';

interface Tab {
  type: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class AppTabsComponent implements OnInit {
  cars: any[] = [];

  tabs: Tab[] = [
    {
      type: 'most_selling',
      name: 'Most selling',
      selected: true
    },
    {
      type: 'best_selling',
      name: 'Best selling',
      selected: false
    },
    {
      type: 'most_visited',
      name: 'Most visited',
      selected: false
    }
  ];

  constructor(private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    this.getCarList('most_selling');
  }

  changeTab(tab: Tab) {
    this.tabs.forEach(x => {
      x.selected = false;
      if (tab.type == x.type) {
        x.selected = true
      }
    })
    this.getCarList(tab.type);
  }

  private getCarList(type: string) {
    this.cars = [];
    this.carService.getCars(type)
      .subscribe((data: Car[]) => {
        this.cars = data;
      });
  }
}
