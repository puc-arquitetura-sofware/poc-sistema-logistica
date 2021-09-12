import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SgeRoutingModule } from './sge-routing.module';
import { RouterModule } from '@angular/router';
import { SgeAppComponent } from './sge.app.component';
import { MainComponent } from './main/main.component';
import { SgeGuard } from './services/sge.guard';


@NgModule({
  declarations: [SgeAppComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    SgeRoutingModule
  ],
  providers: [SgeGuard]
})
export class SgeModule { }
