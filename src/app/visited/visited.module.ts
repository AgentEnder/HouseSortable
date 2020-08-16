import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitedComponent } from './visited.component';

const routes: Routes = [{
    path: '',
    component: VisitedComponent
}];

@NgModule({
    declarations: [
        VisitedComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [

    ]
})
export class VisitedModule {

}
