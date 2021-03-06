import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/models/Perfil';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { Usuario } from '../../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  usuario: Usuario;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

      super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    super.configurarMensagensValidacaoBase(this.validationMessages);    
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });

  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm);
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);
      this.contaService.login(this.usuario)
      .subscribe(
          sucesso => {
            var response = {
              userToken: sucesso,
              accessToken: "algumTokenAleatórioPorAqui"
            };
          
            this.processarSucesso(response)
          
          },
          falha => {
            this.processarFalha(falha)
          }
      );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigate([this.returnUrl]);
      });
    }
  }

  processarFalha(fail: any){
    debugger;
    console.log('falhar', fail);
    
    this.errors = fail.error.errors.Mensagens;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


}
