import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PresenceComponent } from './presence/presence.component';

const routes: Routes = [
    { path: '', component: NotfoundComponent },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'presence',
        component: PresenceComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
