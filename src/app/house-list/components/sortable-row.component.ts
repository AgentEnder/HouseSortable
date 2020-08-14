import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HouseModel } from '../../core/models/house-model';

@Component({
    templateUrl: './sortable-row.component.html',
    selector: 'app-sortable-row'
})
export class SortableRowComponent {
    @Input() house: HouseModel;
    @Output() moveUp = new EventEmitter<null>();
    @Output() moveDown = new EventEmitter<null>();
}
