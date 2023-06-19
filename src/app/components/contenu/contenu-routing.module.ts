import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FormationComponent } from './formation/formation.component';
import { JitsiComponent } from './formation/jitsi/jitsi.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
    { path: '', component: NotfoundComponent },
    {
        path : 'formation',
        component : FormationComponent
    },
    {
        path : 'project',
        component : ProjectComponent

    },
    {
        path:'meet/:formationName',
        component : JitsiComponent
    },
    {
        path:'task',
        component:TaskComponent
    },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
