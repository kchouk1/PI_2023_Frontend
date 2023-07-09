import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AppConfigService } from 'src/app/_services/AppConfigService';
import { CongeService } from 'src/app/_services/conge.service';
import { UserService } from 'src/app/_services/users.service';
import { AppConfig } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [ConfirmationService, MessageService,AppConfigService],
})
export class DashboardComponent implements OnInit {
    basicData: any;
    multiAxisData: any;
    multiAxisOptions: any;
    lineStylesData: any;
    basicOptions: any;
    subscription!: Subscription;
    data: any;
    chartOptions: any;
    config!: AppConfig;
    employees: User[] = [];
    countusers: number=0;
    countconge: number=0;

    constructor(private messageService: MessageService, private configService: AppConfigService,  private userService: UserService , private CongeService: CongeService) {}

    ngOnInit() {
        this.CongeService.getCongeCount().subscribe((l) => {
            this.countconge = l;
            
        
        this.userService.getUserCount().subscribe((r) => {
            this.countusers = r;
            console.log("ejndjeneji",this.countconge);
            this.data = {
            labels: ['A','Conge','Users'],
            datasets: [
                {
                    data: [3, this.countconge,this.countusers],
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D"
                    ]
                }
            ]
        };

        });
    });
        
}}
