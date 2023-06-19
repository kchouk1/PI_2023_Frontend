import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenuRoutingModule } from './contenu-routing.module';
import { ContenuComponent } from './contenu.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ChartModule } from 'primeng/chart';
import { FormationComponent } from './formation/formation.component';
import { JitsiComponent } from './formation/jitsi/jitsi.component';
import { MeetComponent } from './formation/jitsi/meet/meet.component';
import { SelectItem } from 'primeng/api';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';



@NgModule({
    declarations: [ContenuComponent,UtilisateursComponent,FormationComponent,JitsiComponent,MeetComponent, TaskComponent, ProjectComponent],
    imports: [
        CommonModule,
        ContenuRoutingModule,
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ChartModule,
        DropdownModule,
      
    ],
})
export class ContenuModule {}
