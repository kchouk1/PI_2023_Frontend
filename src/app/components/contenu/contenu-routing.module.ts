import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PresenceComponent } from './presence/presence.component';
import { CongeComponent } from './conge/conge.component';
import { TeamComponent } from './team/team.component';
import { HolidayComponent } from './holiday/holiday.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { FormationComponent } from './formation/formation.component';
import { JitsiComponent } from './formation/jitsi/jitsi.component';
import { MeetComponent } from './formation/jitsi/meet/meet.component';

const routes: Routes = [
    { path: '', component: NotfoundComponent },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'presence',
        component: PresenceComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'conge',
        component: CongeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'equipe',
        component: TeamComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'holidays',
        component: HolidayComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard],
        //data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'project',
        component:ProjectComponent ,
        canActivate: [AuthGuard],
       // data: { role: 'ROLE_ADMIN' },
    },

    {
        path: 'formation',
        component:FormationComponent ,
        canActivate: [AuthGuard],
       // data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'formation/meet/:formationName',
        component:JitsiComponent ,
        canActivate: [AuthGuard],
       // data: { role: 'ROLE_ADMIN' },
    },
    {
        path:'contenu/formation/jitsi/meet',
        component:MeetComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
