import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: "Accueil",
        items: [
          {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            routerLink: ["/dashboard"],
          },
        ],
      },
      {
        label: "Modules",
        items: [
          {
            label: "Employés",
            icon: "pi pi-fw pi-id-card",
            routerLink: ["/contenu/utilisateurs"],
          },
          {
            label: "Présence",
            icon: "pi pi-fw pi-clock",
            routerLink: ["/contenu/presence"],
          },
          {
            label: "Congé",
            icon: "pi pi-calendar-times",
            routerLink: ["/contenu/conge"],
          },
          {
            label: "Equipe",
            icon: "pi pi-users",
            routerLink: ["/contenu/equipe"],
          },
        ],
      },
      {
        label: "Paramètres",
        items: [
          {
            label: "Jours fériés",
            icon: "pi pi-fw pi-calendar-minus",
            routerLink: ["/contenu/holidays"],
          },
        ],
      },
    ];
  }
}