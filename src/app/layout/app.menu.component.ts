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
                        label: 'Utilisateurs',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/contenu/utilisateurs'],
                    },
                    {
                        label:'Formations',
                        icon:'pi pi-fw pi-id-card',
                        routerLink:['/contenu/formation'],
                    },
                    {
                        label:'Project',
                        icon:'pi pi-fw pi-id-card',
                        routerLink:['/contenu/project']

                    },
                    {
                        label:'Task',
                        icon:'pi pi-fw pi-id-card',
                        routerLink:['/contenu/task']
                    }

                ],
            },
        ];
    }
}
