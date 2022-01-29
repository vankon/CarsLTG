import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { CarsService } from '../shared/cars.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  item$: Observable<any>;

  constructor(
    private carsService: CarsService,
    firestore: Firestore) {
    const collect = collection(firestore, 'brands');
    this.item$ = collectionData(collect);
    this.item$.subscribe(data => {
      console.log(data)
    })
  }
  ngOnInit(): void {
    this.carsService.test().subscribe(data => {
      console.log(data)
    })
  }

}
