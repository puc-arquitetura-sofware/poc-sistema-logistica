import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMercadoriaComponent } from './components/lista-mercadoria/lista-mercadoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';

let components = [
  ListaMercadoriaComponent,
  GoogleMapsComponent
]

@NgModule({


  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    GoogleMapsModule
  ],
  exports: [...components]
})
export class SharedModule { }
