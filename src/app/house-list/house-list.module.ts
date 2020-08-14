import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SortableModule } from '@progress/kendo-angular-sortable';

import { SortableRowComponent } from './components/sortable-row.component';
import { HouseListComponent } from './house-list.component';

const routes: Routes = [{
    path: '',
    component: HouseListComponent
}]

@NgModule({
  declarations: [
    SortableRowComponent,
    HouseListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SortableModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    DragDropModule,
    // BrowserAnimationsModule
  ],
  providers: [],
})
export class HouseListModule { }
