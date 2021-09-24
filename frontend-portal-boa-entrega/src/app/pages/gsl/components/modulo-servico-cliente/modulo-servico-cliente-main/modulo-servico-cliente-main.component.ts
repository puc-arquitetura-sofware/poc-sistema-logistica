import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';

@Component({
  selector: 'app-modulo-servico-cliente-main',
  templateUrl: './modulo-servico-cliente-main.component.html',
  styleUrls: ['./modulo-servico-cliente-main.component.css']
})
export class ModuloServicoClienteMainComponent   extends FormBaseComponent implements OnInit  {

  localStorageUtils = new LocalStorageUtils();
  user: any;
  idPerfilColaborador = "6fa163ae-dc8a-481e-a829-3ecd0b096123";
  eUmColaborador = false;


  constructor(private router: Router) {  
    super();
    debugger;
    this.user = this.localStorageUtils.obterUsuario();
    console.log(this.user);
    
    this.eUmColaborador = this.user['perfil'] == this.idPerfilColaborador;
    console.log(this.eUmColaborador);

    
    if(!this.eUmColaborador) {
      this.router.navigate(['/acesso-negado']);
    }
  }




  ngOnInit(): void {
  }


}
