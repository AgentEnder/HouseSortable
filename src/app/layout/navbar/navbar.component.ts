import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Output() public navToggle = new EventEmitter<void>();
    user: any;

    constructor() {
    }

    getName(){
        let name = '';
        if (this.user) {
            name = this.user.nickname.split('.').map((x: string) => (x[0].toUpperCase() + x.substr(1))).join(' ');
        }
        return name;
    }
}
