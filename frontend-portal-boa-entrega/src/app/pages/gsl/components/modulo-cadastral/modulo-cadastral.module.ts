import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloCadastralRoutingModule } from './modulo-cadastral-routing.module';
import { ModuloCadastralAppComponent } from './modulo-cadastral-app.component';
import { ModuloCadastralMainComponent } from './modulo-cadastral-main/modulo-cadastral-main.component';


@NgModule({
  declarations: [
    ModuloCadastralAppComponent, 
    ModuloCadastralMainComponent],
  imports: [
    CommonModule,
    ModuloCadastralRoutingModule
  ]
})
export class ModuloCadastralModule { }
