import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HouseModel } from '../../core/models/house-model';

@Component({
    templateUrl: './sortable-row.component.html',
    selector: 'app-sortable-row'
})
export class SortableRowComponent implements OnInit {
    @Input() house: HouseModel;
    @Input() placeholder: boolean = false;
    @Output() moveUp = new EventEmitter<null>();
    @Output() moveDown = new EventEmitter<null>();
    imgSeed: number;

    ngOnInit(): void {
        this.imgSeed = Math.random();
    }

    getRandomImgSrc(): string{
        return `https://picsum.photos/256/256?${this.imgSeed}`;
    }
}
