import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Team } from 'src/app/_models/team';
import { User } from 'src/app/_models/user';
import { TeamService } from 'src/app/_services/team.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class TeamComponent implements OnInit {
    teams: Team[] = [];
    selectedTeams: Team[] = [];
    selectedUsers: User[] = [];
    users: User[] = [];
    loading: boolean = true;
    teamDialog: boolean = false;
    team: Team = new Team();

    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private teamService: TeamService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getAllusers().subscribe((r) => {
            this.users = r;
        });
        this.teamService.getAllTeams().subscribe((r) => {
            this.teams = r;
        });
    }

    openNew() {
        this.team = new Team();
        this.selectedUsers = [];
        this.loading = false;
        this.teamDialog = true;
    }

    hideDialog() {
        this.teamDialog = false;
        this.loading = false;
    }

    editTeam(team: Team) {
        this.team = { ...team };
        this.selectedUsers = this.team.users;
        this.teamDialog = true;
    }

    saveTeam() {
        this.loading = true;
        if (this.team.id) {
            this.team.users = this.selectedUsers;
            this.teamService.updateTeam(this.team).subscribe({
                next: (r) => {
                    this.teams[this.findIndexById(this.team.id)] = this.team;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Equipe Updated',
                        life: 3000,
                    });
                },
                error: (e) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Employé existe dans une autre équipe',
                        life: 3000,
                    });
                },
            });
        } else {
            this.teamService.addTeam(this.team).subscribe((r) => {
                this.teams.push(r);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Equipe Created',
                    life: 3000,
                });
            });
        }

        this.teams = [...this.teams];
        this.teamDialog = false;
        this.team = new Team();
    }

    deleteTeam(team: Team) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + team.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.teamService.removeTeam(team.id!).subscribe({
                    next: (res) => {
                        this.teams = this.teams.filter(
                            (val) => val.id !== team.id
                        );
                    },
                });
            },
        });
    }

    // addUserToTeam(teamId: number, userId: number): void {

    //     this.teamService.addUserToTeam(teamId, ).subscribe((team) => {
    //         this.userService.getUserById(userId).subscribe((user) => {
    //             if (team && user) {
    //                 team.users.push(user);
    //                 this.teamService.updateTeam(team).subscribe(
    //                     (updatedTeam) => {
    //                         console.log(
    //                             "L'utilisateur a été ajouté à l'équipe avec succès"
    //                         );
    //                         // Faire quelque chose si nécessaire après la mise à jour de l'équipe
    //                     },
    //                     (error) => {
    //                         console.error(
    //                             "Erreur lors de la mise à jour de l'équipe :",
    //                             error
    //                         );
    //                         // Gérer l'erreur en cas d'échec de la mise à jour de l'équipe
    //                     }
    //                 );
    //             } else {
    //                 throw new Error('Équipe ou utilisateur introuvable');
    //             }
    //         });
    //     });
    // }

    deleteSelectedTeams() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected team?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedTeams.forEach((team) => {
                    this.teamService.removeTeam(team.id!).subscribe((r) => {
                        this.teams = this.teams.filter(
                            (val) => !this.selectedTeams.includes(val)
                        );
                        this.selectedTeams = [];
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'team Deleted',
                            life: 3000,
                        });
                    });
                });
            },
        });
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
