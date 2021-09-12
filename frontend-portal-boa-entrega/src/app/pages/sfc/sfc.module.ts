import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SfcRoutingModule } from './sfc-routing.module';
import { SfcAppComponent } from './sfc.app.component';
import { SfcGuard } from './services/sfc.guard';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    SfcAppComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SfcRoutingModule
  ],
  providers: [SfcGuard]
})
export class SfcModule { }
