import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [

    ],
    providers: [

    ]
})
export class HomeModule {

}