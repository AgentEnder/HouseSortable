import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';
import { Subscription, forkJoin, zip } from 'rxjs';
import { xkcdPassphrase } from 'xkcd-passphrase';

import { HouseList, HouseModel } from '../core/models/house-model';
import { User } from '../core/models/user-model';
import { AuthService } from '../core/services/auth.service';
import { HouseListService } from '../core/services/house-list.service';
import { LoadDialogComponent } from './components/load-dialog/load-dialog.component';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../core/services/local-storage.service';
import { HouseListModule } from './house-list.module';

@Component({
    templateUrl: './house-list.component.html'
})
export class HouseListComponent implements OnInit, OnDestroy {
    models: HouseModel[] = [];
    newModel: HouseModel = {} as HouseModel;
    houseList: HouseList = {
        createdAt: null,
        data: this.models,
        modifiedAt: null,
        name: null,
        public: false
    };

    @ViewChild('FileInput') fileInput: Element;

    editable = false;

    user: User;
    loggedIn;
    subscription: Subscription;

    constructor(
        private houseListService: HouseListService,
        private auth: AuthService,
        private dialogService: MatDialog,
        private activatedRoute: ActivatedRoute,
        private storageService: LocalStorageService
    ) {
        this.subscription = zip(this.auth.user$, activatedRoute.queryParamMap).pipe(
            map(
                ([user, paramMap]) => ({user, paramMap})
            )
        ).subscribe(next => {
            this.user = next.user;
            this.loggedIn = next.user !== null;
            const uid = next.paramMap.get('uid') || (this.user && this.user.uid);
            this.editable = uid === null || (this.user && uid === this.user.uid);
            const listName = next.paramMap.get('houseList');
            if (listName && listName !== '') {
                this.houseListService.getList(uid, decodeURIComponent(listName)).subscribe(x => {
                    if (x) {
                        this.houseList = x;
                        this.models = x.data;
                    }
                });
            }
        });
    }

    async ngOnInit(): Promise<void> {
        const cachedObject = this.storageService.retrieveLocalStorage<HouseList>('cachedList');
        if (cachedObject) {
            this.houseList = cachedObject;
            this.models = cachedObject.data;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addModel(): void {
        this.models.push(this.newModel);
        this.newModel = {} as HouseModel;
    }

    drop(event: CdkDragDrop<string[]>): void {
        this.moveItemInArray(this.models, event.previousIndex, event.currentIndex);
    }

    moveItemInArray(arr, fromIndex, toIndex): void {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    removeItemInArray(arr, fromIndex): void {
        arr.splice(fromIndex, 1);
    }

    async import(event: InputEvent & { target: { files: FileList } }): Promise<void> {
        if (event.target.files && event.target.files.length === 1) {
            const file: File = event.target.files[0];
            let json;
            json = await file.text();
            this.models = JSON.parse(json);
        }
    }

    export(): void {
        const str = JSON.stringify(this.models);
        const data = this.encode(str);

        const blob = new Blob([data], {
            type: 'application/octet-stream'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'house_list.ehf');
        link.click();
    }

    encode(s): Uint8Array {
        const out = [];
        for (let i = 0; i < s.length; i++) {
            out[i] = s.charCodeAt(i);
        }
        return new Uint8Array(out);
    }

    save(): void {
        this.dialogService.open(SaveDialogComponent, {data: this.houseList}).afterClosed().subscribe(x => {

        });
    }

    load(): void {
        this.dialogService.open(LoadDialogComponent, {width: '50vw'}).afterClosed().subscribe((x: HouseList) => {
            if (typeof(x) === 'object' && 'name' in x) {
                this.houseList = x;
                this.models = x.data;
            }
        });
    }

    deleteCloudSave(): void {
        this.houseListService.deleteList(this.houseList);
    }

    logIn(): void {
        this.storageService.setLocalStorage('cachedList', this.houseList);
        this.auth.googleSignIn();
    }
}
