import { Component } from '@angular/core';
import { HouseList } from 'src/app/core/models/house-model';
import { HouseListService } from 'src/app/core/services/house-list.service';

@Component({
    templateUrl: './load-dialog.component.html'
})
export class LoadDialogComponent {
    options: HouseList[];
    filteredOptions: HouseList[];

    selectedList: HouseList;

    constructor(
        private houseListService: HouseListService
    ) {
        houseListService.getListsForLoggedInUser().subscribe(x => {
            this.options = x;
            this.filteredOptions = this.options;
        });
    }

    filter(val: any): void {
        this.filteredOptions = this.options.filter(x => x === val || x.name.includes(name));
    }

    name = (list: HouseList) => list && list.name;

    choiceIsValid(){
        return this.selectedList && typeof(this.selectedList) !== 'string' && 'name' in this.selectedList;
    }
}
