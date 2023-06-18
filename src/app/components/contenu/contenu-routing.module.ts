import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PresenceComponent } from './presence/presence.component';
import { CongeComponent } from './conge/conge.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
    { path: '', component: NotfoundComponent },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
        // data: { role: 'ROLE_ADMIN' },
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
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
