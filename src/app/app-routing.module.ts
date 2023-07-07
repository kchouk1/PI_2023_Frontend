import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UtilisateursComponent } from './components/contenu/utilisateurs/utilisateurs.component';
import { FormationComponent } from './components/contenu/formation/formation.component';
import { JitsiComponent } from './components/contenu/formation/jitsi/jitsi.component';
import { MeetComponent } from './components/contenu/formation/jitsi/meet/meet.component';
import { ProjectComponent } from './components/contenu/project/project.component';
import { TaskComponent } from './components/contenu/task/task.component';
import { Project } from './_models/project';
import { TaskByProjectComponent } from './components/contenu/task-by-project/task-by-project.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,

                    children: [
                        {
                            path: 'dashboard',
                            component: DashboardComponent,
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'contenu/utilisateurs',
                            component: UtilisateursComponent,
                        },
                        {
                            path:'contenu/formation',
                            component:FormationComponent
                        },
                        {
                            path:'contenu/formation/meet/:formationName',
                            component:JitsiComponent
                        },
                        {
                            path:'contenu/formation/jitsi/meet',
                            component:MeetComponent
                        },
                        {
                            path : 'contenu/project',
                            component : ProjectComponent

                        },
                        {
                            path:'contenu/task',
                            component:TaskComponent

                        },
                        {
                            path:'contenu/task/:projectId',
                            component : TaskByProjectComponent
                        },

                        { path: '', pathMatch: 'full', redirectTo: 'contenu/formation' },
                        { path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent },
                        {
                            path: 'contenu',

                            loadChildren: () =>
                                import(
                                    './components/contenu/contenu.module'
                                ).then((m) => m.ContenuModule),
                        },
                    ],
                },

                {
                    path: '**',
                    component: NotfoundComponent,
                },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
