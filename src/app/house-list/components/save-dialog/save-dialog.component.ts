import { Component, OnDestroy, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { HouseList } from '../../../core/models/house-model';
import { User } from '../../../core/models/user-model';
import { AuthService } from '../../../core/services/auth.service';
import { HouseListService } from '../../../core/services/house-list.service';

@Component({
    templateUrl: './save-dialog.component.html'
})
export class SaveDialogComponent implements OnDestroy {
    houseList: HouseList;

    user: User;
    userSubscription: Subscription;

    saved = false;

    constructor(
        private houseListService: HouseListService,
        private auth: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: HouseList
    ) {
        this.userSubscription = this.auth.user$.subscribe(x => {
            this.user = x;
            if (!data.publicUrl) {
                this.generatePublicUrl();
            }
        });
        this.houseList = data;
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    generatePublicUrl(): void {
        this.houseList.publicUrl = this.user && `${window.location}?houseList=${encodeURIComponent(this.houseList.name)}&uid=${this.user.uid}`;
    }

    save(): void {
        this.houseListService.saveList(this.houseList).then( x => {
            console.log(x);
            this.saved = true;
        });
    }
}
