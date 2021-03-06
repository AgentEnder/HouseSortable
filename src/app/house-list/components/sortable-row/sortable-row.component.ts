import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HouseModel } from '../../../core/models/house-model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    templateUrl: './sortable-row.component.html',
    selector: 'app-sortable-row'
})
export class SortableRowComponent implements OnInit {
    @Input() house: HouseModel;
    @Input() placeholder = false;
    @Input() showUpArrow: boolean;
    @Input() showDownArrow: boolean;
    @Input() editable: boolean;
    @Output() moveUp = new EventEmitter<null>();
    @Output() moveDown = new EventEmitter<null>();
    @Output() remove = new EventEmitter<null>();
    imgSeed: number;
    isMobile: boolean;

    constructor(
        private breakpoints: BreakpointObserver
    ) {
        breakpoints.observe([Breakpoints.Handset]).subscribe(x=>{
            this.isMobile = x.matches;
        });
    }

    ngOnInit(): void {
        this.imgSeed = Math.random();
    }

    getRandomImgSrc(): string{
        return `https://picsum.photos/256/256?${this.imgSeed}`;
    }

    addPro(): void {
        this.house.pros = [...(this.house.pros || []), 'TEST']
    }

    addCon(): void {
        this.house.cons = [...(this.house.cons || []), 'TESt']
    }
}
