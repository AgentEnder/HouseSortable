import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ShareService } from '../../core/services/share.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Output() public navToggle = new EventEmitter<void>();
    user: any;

    constructor(public auth: AuthService, public share: ShareService) {
    }

    getName(): string{
        let name = '';
        if (this.user) {
            name = this.user.nickname.split('.').map((x: string) => (x[0].toUpperCase() + x.substr(1))).join(' ');
        }
        return name;
    }
}
