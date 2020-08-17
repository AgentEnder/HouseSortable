import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ContenteditableModule } from '@ng-stack/contenteditable';

import { HouseListService } from '../core/services/house-list.service';
import { LoadDialogComponent } from './components/load-dialog/load-dialog.component';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { SortableRowComponent } from './components/sortable-row/sortable-row.component';
import { HouseListComponent } from './house-list.component';

const routes: Routes = [{
    path: '',
    component: HouseListComponent
}];

@NgModule({
  declarations: [
    SortableRowComponent,
    HouseListComponent,
    SaveDialogComponent,
    LoadDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ContenteditableModule,
    ClipboardModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    DragDropModule,
    MatDialogModule
    // BrowserAnimationsModule
  ],
  providers: [HouseListService],
})
export class HouseListModule { }
