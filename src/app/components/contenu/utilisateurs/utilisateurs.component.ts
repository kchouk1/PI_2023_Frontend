import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    styleUrls: ['./utilisateurs.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class UtilisateursComponent implements OnInit {
    users: User[] = [];
    loading: boolean = true;
    userDialog: boolean = false;
    user: User = new User();
    selectedUsers: User[] = [];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.userService.getAllusers().subscribe(
            (r) => {
                this.users = r;
                console.table(this.users);
                this.loading = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }

    openNew() {
        this.user = new User();
        this.loading = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter(
                    (val) => !this.selectedUsers.includes(val)
                );
                this.selectedUsers = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Users Deleted',
                    life: 3000,
                });
            },
        });
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter((val) => val.id !== user.id);
                this.user = new User();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Deleted',
                    life: 3000,
                });
            },
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.loading = false;
    }

    saveUser() {
        this.loading = true;

        if (this.user.id) {
            if (this.user.id) {
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                this.users.push(this.user);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = new User();
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
