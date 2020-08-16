import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ShareInfo } from '../../models/share-info-model';

@Component({
    templateUrl: './share-dialog.component.html'
})
export class ShareDialogComponent{
    text: string;
    title: string;
    url: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ShareInfo
    ) {
        this.text = data.text;
        this.title = data.title;
        this.url = data.url;
    }
}
