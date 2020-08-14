import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';

import { HouseModel } from '../core/models/house-model';

@Component({
    templateUrl: './house-list.component.html'
})
export class HouseListComponent {
    models: HouseModel[] = [];
    newModel: HouseModel = {} as HouseModel;

    @ViewChild('FileInput') fileInput: Element;

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
}
