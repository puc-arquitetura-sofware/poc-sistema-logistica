import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SgeGuard } from './services/sge.guard';
import { SgeAppComponent } from './sge.app.component';

const routes: Routes = [{
  path: '', component: SgeAppComponent,
  children: [
      { 
        path: 'modulo-gestao-entregas', 
        component: MainComponent, canActivate: [SgeGuard]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SgeRoutingModule { }
