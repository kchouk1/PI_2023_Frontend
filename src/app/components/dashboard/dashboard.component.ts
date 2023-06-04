import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [ConfirmationService, MessageService],
})
export class DashboardComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
