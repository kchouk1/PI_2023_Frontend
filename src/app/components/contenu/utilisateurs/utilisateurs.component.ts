import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
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
    isAdmin: boolean = false;
    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
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
                for (let i = 0; i < this.selectedUsers.length; i++) {
                    const user = this.selectedUsers[i];
                    this.userService.removeUser(user.id!).subscribe({
                        next: (res) => {
                            this.users = this.users.filter(
                                (val) => val.id !== user.id
                            );
                        },
                    });
                }
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
                this.userService.removeUser(user.id!).subscribe({
                    next: (res) => {
                        this.users = this.users.filter(
                            (val) => val.id !== user.id
                        );
                        console.log(res);
                    },
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
            this.userService.updateUser(this.user).subscribe((r) => {
                console.log(r);
            });
            this.users[this.findIndexById(this.user.id)] = this.user;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Congé Updated',
                life: 3000,
            });
        } else {
            this.userService.addUser(this.user).subscribe((r) => {
                this.users.push(r);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Congé Created',
                    life: 3000,
                });""
            });
        }

        this.users = [...this.users];
        this.userDialog = false;
        this.user = new User();
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
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
