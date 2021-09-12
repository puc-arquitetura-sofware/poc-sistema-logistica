import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GslRoutingModule } from './gsl-routing.module';
import { GslGuard } from './services/gsl.guard';
import { GslAppComponent } from './gsl.app.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [GslAppComponent, MainComponent],
  imports: [
    CommonModule,
    GslRoutingModule
  ],
  providers: [GslGuard]
})
export class GslModule { }
