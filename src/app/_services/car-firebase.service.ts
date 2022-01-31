import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { forkJoin, map, Observable, switchMap, take } from 'rxjs';
import { BaseDictionary, Car } from '../_models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class CarFirebaseService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getBrands(): Observable<BaseDictionary[]> {
    return this.getFromFirebase(this.db.collection<BaseDictionary>('brands'))
  }

  getBodyType(): Observable<BaseDictionary[]> {
    return this.getFromFirebase(this.db.collection<BaseDictionary>('body_type'))
  }

  getCars(type: string): Observable<Car[]> {
    // const brandRef = this.db.firestore.doc('brands/o0IdZMOU9zFGZk9wIYn9');

    return this.db.collection<Car>('cars', ref => ref.where(type, '==', true))
      .stateChanges()
      .pipe(
        map(actions => actions.map(item => {
          const data = item.payload.doc.data() as Car;
          const id = item.payload.doc.id;
          const year = new Date(data.year.seconds * 1000)
          return { ...data, id, year };
        })),
        switchMap((cars: any[]) =>
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

  getDictionaryRef(ref: DocumentReference): Observable<any> {
    return this.db.doc(ref).snapshotChanges().pipe(
      map((item: any) => {
        forkJoin([
          this.getImageUrl(item.image)
        ]).pipe(map(([imageUrl]) => {
          return { ...item, image: imageUrl }
        })
        )
      }
      ));
  }

  private getFromFirebase(collection: AngularFirestoreCollection<BaseDictionary>): Observable<BaseDictionary[]> {
    return collection.snapshotChanges()
      .pipe(
        map(x => x.slice(0, 6)),
        map(actions => actions.map(item => {
          const data = item.payload.doc.data() as BaseDictionary;
          const id = item.payload.doc.id;
          return { ...data, id };
        })),
        switchMap((types: BaseDictionary[]) =>
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

  getImageUrl(path: string): Observable<string> {
    const ref = this.storage.refFromURL(path);
    return ref.getDownloadURL()
  }
}
