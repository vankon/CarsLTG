import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IDictionary } from '../_models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarFirebaseService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getBrands(): Observable<IDictionary[]> {
    return this.db.collection<IDictionary>('brands').valueChanges().pipe(
      switchMap((brands: IDictionary[]) =>
        forkJoin(brands.map(brand =>
          forkJoin([
            this.getImageUrl(brand.image)
          ]).pipe(map(([imageUrl]) => {
            return { ...brand, image: imageUrl }
          })
          )
        ))
      ))
  }

  getBodyType(): Observable<IDictionary[]> {
    return this.db.collection<IDictionary>('body_type').valueChanges().pipe(
      switchMap((types: IDictionary[]) =>
        forkJoin(types.map(type =>
          forkJoin([
            this.getImageUrl(type.image)
          ]).pipe(map(([imageUrl]) => {
            return { ...type, image: imageUrl }
          })
          )
        ))
      ))
  }

  getCars() {
    return this.db.collection<IDictionary>('cars').valueChanges().pipe(
      switchMap((cars: IDictionary[]) =>
        forkJoin(cars.map(car =>
          forkJoin([
            this.getImageUrl(car.image)
          ]).pipe(map(([imageUrl]) => {
            return { ...car, image: imageUrl }
          })
          )
        ))
      ))
  }

  getImageUrl(path: string): Observable<string> {
    const ref = this.storage.refFromURL(path);
    return ref.getDownloadURL()
  }
}
