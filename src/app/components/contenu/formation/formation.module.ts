import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JitsiComponent } from './jitsi/jitsi/jitsi.component';
import { MeetComponent } from './jitsi/meet/meet.component';



@NgModule({
  declarations: [

  
    JitsiComponent,
         MeetComponent
  ],
  imports: [
    CommonModule
  ],

})
export class FormationModule { }
