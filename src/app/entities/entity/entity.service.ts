import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  protected entityUrl!: string;

  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService,
    protected firestore?: AngularFirestore
  ) { }

  get(filter: string) {
    const params = new HttpParams({ fromString: filter });
    return this.http.get<T>(this.entityUrl, { params });
  }

  list(userId: string, collection: string) {
    return this.firestore!.collection<T>(collection, ref => ref.where('userId', '==', userId)).valueChanges();
  }

  async save(data: T, uid: string, collectionName: string) {
    return this.firestore!.collection(collectionName).doc(uid).set(data);
  }

  async delete(uid: string, collection: string) {
    return this.firestore!.collection(collection).doc(uid).delete();
  }

}
