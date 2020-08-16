import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { tap, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    public show;

    mode = 'side';

    topGap = 64;

    public routes: MenuItem[] = [
        {
            path: '/home',
            icon: 'home',
            label: 'Home'
        },
        {
            path: '/list',
            icon: 'list_alt',
            label: 'Home List'
        },
        {
            path: '/visited',
            icon: 'tour',
            label: 'Visited'
        }
    ];

    public toggleSidenav(): void {
        this.show = !this.show;
    }

    constructor(private breakpoints: BreakpointObserver, public activatedRoute: ActivatedRoute){
        breakpoints.observe([Breakpoints.Handset]).subscribe( ({ matches }) => {
            if (matches) { // Mobile
                this.mode = 'over';
                this.topGap = 56;
                this.show = false;
            } else {
                this.mode = 'side';
                this.topGap = 64;
                this.show = true;
            }
            console.log('Mobile: ', matches);
        });
    }
}

export interface MenuItem{
    icon: string;
    label: string;
    path?: string;
    children?: MenuItem[];
}
