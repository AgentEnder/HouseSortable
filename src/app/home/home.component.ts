import { Component } from "@angular/core";
import { AuthService } from '../core/services/auth.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent{
    constructor(public auth: AuthService) {}
}
