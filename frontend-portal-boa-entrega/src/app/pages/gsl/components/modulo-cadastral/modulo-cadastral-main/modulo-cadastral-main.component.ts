import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';

@Component({
  selector: 'app-modulo-cadastral-main',
  templateUrl: './modulo-cadastral-main.component.html',
  styleUrls: ['./modulo-cadastral-main.component.css']
})
export class ModuloCadastralMainComponent   extends FormBaseComponent implements OnInit  {

  constructor() {  super();}

  ngOnInit(): void {
  }

}
