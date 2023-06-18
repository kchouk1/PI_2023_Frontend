import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    isAdmin: boolean = false;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        this.userService.getCurrentUser().subscribe((r) => {
            this.user = r;
        });
    }

    saveUser() {
        if (this.user.id) {
            this.userService.updateUser(this.user).subscribe((r) => {
                console.log(r);
            });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Modification enregistrée',
                life: 3000,
            });
        }
    }
}
