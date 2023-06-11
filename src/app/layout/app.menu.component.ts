import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Modules',
                items: [
                    {
                        label: 'Employés',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/contenu/utilisateurs'],
                    },
                    {
                        label: 'Présence',
                        icon: 'pi pi-fw pi-clock',
                        routerLink: ['/contenu/presence'],
                    },
                ],
            },
        ];
    }
}
