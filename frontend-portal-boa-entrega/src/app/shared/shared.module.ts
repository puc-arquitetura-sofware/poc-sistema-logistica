import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMercadoriaComponent } from './components/lista-mercadoria/lista-mercadoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

let components = [ListaMercadoriaComponent]

@NgModule({


  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
  ],
  exports: [...components]
})
export class SharedModule { }
