import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent   extends FormBaseComponent implements OnInit  {

  constructor() {  super();}

  ngOnInit(): void {
  }

}
