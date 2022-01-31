import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/_models/cars.model';
import { CarFirebaseService } from 'src/app/_services/car-firebase.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class AppCarItemComponent implements OnInit {
  @Input() model: Car;

  constructor(private carService: CarFirebaseService) {
  }

  ngOnInit(): void {
    if (this.model.brand_image)
      return

    this.model.brand?.get().then((x: any) =>
      this.carService.getImageUrl(x.data().image).subscribe(url =>
        this.model.brand_image = url
      ))
  }

}
