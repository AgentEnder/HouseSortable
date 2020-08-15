import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, from, of } from 'rxjs';

import { AuthService } from './auth.service';
import { HouseList } from '../models/house-model';

import { switchMap, take, map } from 'rxjs/operators';
import { User } from '../models/user-model';

@Injectable()
export class HouseListService {
    userLists: Observable<HouseList[]>;
    loggedInUser: User;

    constructor(private firestore: AngularFirestore, private auth: AuthService) {
        this.userLists = this.auth.user$.pipe(
            switchMap((user) => {
                return firestore.collection<HouseList>(`users/${user.uid}/houseLists`).get().pipe(
                    map(x => x.docs.map(y => y.data() as HouseList))
                );
            })
        );

        this.auth.user$.subscribe(x => this.loggedInUser = x);
    }

    getListsForLoggedInUser(): Observable<HouseList[]> {
        return this.userLists.pipe(
            take(1)
        );
    }

    getList(uid, listName): Observable<HouseList> {
        return this.firestore.collection<HouseList[]>(`users/${uid}/houseLists`, ref => ref.where('name', '==', listName)).get().pipe(
            map(x => x.docs[0].data() as HouseList)
        );
    }

    saveList(list: HouseList): Observable<AngularFirestoreDocument<HouseList>> {
        if (this.loggedInUser) {
            const docRef: AngularFirestoreDocument<HouseList> =
                this.firestore.doc(`users/${this.loggedInUser.uid}/houseLists/${list.name}`);
            docRef.set(list);
            return of(docRef);
        } else {
            throw new Error('You must be logged in to save a collection!');
        }
    }
}
