import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modulo-ciencia-dados-main',
  templateUrl: './modulo-ciencia-dados-main.component.html',
  styleUrls: ['./modulo-ciencia-dados-main.component.css']
})
export class ModuloCienciaDadosMainComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    this.spinner.show();

    
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

}
