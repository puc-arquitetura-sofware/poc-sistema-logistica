import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';

@Component({
  selector: 'app-modulo-servico-cliente-main',
  templateUrl: './modulo-servico-cliente-main.component.html',
  styleUrls: ['./modulo-servico-cliente-main.component.css']
})
export class ModuloServicoClienteMainComponent   extends FormBaseComponent implements OnInit  {

  constructor(private router: Router) {  super();}

  ngOnInit(): void {
  }


}
