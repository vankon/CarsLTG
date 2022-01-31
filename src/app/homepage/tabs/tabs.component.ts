import { Component, OnInit } from '@angular/core';
import { BaseDictionary, Car } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';
import { SamiService } from 'src/app/_services/sami.service';

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
  cars: Car[] = [];
  bsetSelling: Car[] = [];

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

  constructor(
    private carService: CarFirebaseService,
    private samiService: SamiService
  ) {
  }

  ngOnInit(): void {
    this.getCarList('most_selling');
    this.getData();
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

  private getData() {
    this.samiService.getData().subscribe(data => {
      this.bsetSelling = data
    })
  }
}
