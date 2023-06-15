import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Conge } from 'src/app/_models/conge';
import { CongeService } from 'src/app/_services/conge.service';

@Component({
    selector: 'app-conge',
    templateUrl: './conge.component.html',
    styleUrls: ['./conge.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class CongeComponent implements OnInit {
    conges: Conge[] = [];
    loading: boolean = true;
    congeDialog: boolean = false;
    conge: Conge = new Conge();
    selectedConge: Conge[] = [];

    constructor(
        private congeService: CongeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.congeService.getAllConges().subscribe(
            (r) => {
                this.conges = r;
                console.table(this.conges);
                this.loading = false;
            },
            (e) => {
                console.table(e);
            }
        );
    }

    openNew() {
        this.conge = new Conge();
        this.loading = false;
        this.congeDialog = true;
    }

    deleteSelectedConge() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected conge?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.conges = this.conges.filter(
                    (val) => !this.selectedConge.includes(val)
                );
                this.selectedConge = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'conge Deleted',
                    life: 3000,
                });
            },
        });
    }

    editConge(conge: Conge) {
        this.conge = { ...conge };
        this.congeDialog = true;
    }

    deleteConge(conge: Conge) {
        this.confirmationService.confirm({
            message:
                'Are you sure you want to delete ' + conge.description + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.conges = this.conges.filter((val) => val.id !== conge.id);
                this.conge = new Conge();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Conge Deleted',
                    life: 3000,
                });
            },
        });
    }

    hideDialog() {
        this.congeDialog = false;
        this.loading = false;
    }

    saveConge() {
        this.loading = true;
        if (this.conge.id) {
            if (this.conge.id) {
                this.congeService.updateConge(this.conge).subscribe((r) => {
                    console.log(r);
                });
                this.conges[this.findIndexById(this.conge.id)] = this.conge;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                this.congeService.addConge(this.conge);
                this.conges.push(this.conge);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            this.conges = [...this.conges];
            this.congeDialog = false;
            this.conge = new Conge();
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.conges.length; i++) {
            if (this.conges[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
