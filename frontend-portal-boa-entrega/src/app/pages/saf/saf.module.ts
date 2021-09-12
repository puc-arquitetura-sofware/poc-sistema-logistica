import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafRoutingModule } from './saf-routing.module';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { ContaRoutingModule } from '../conta/conta-routing.module';
import { SafAppComponent } from './saf.app.component';
import { SafGuard } from './services/saf.guard';


@NgModule({
  declarations: [SafAppComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    SafRoutingModule
  ],
  providers: [SafGuard]
})
export class SafModule { }
