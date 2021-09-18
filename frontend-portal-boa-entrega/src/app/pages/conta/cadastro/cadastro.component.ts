import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { Usuario } from '../../models/usuario';
import { ContaService } from '../services/conta.service';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { CepConsulta } from '../../models/endereco';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { Perfil } from 'src/app/models/Perfil';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;
  textoDocumento: string = 'CPF (requerido)';
  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";

  MASKS = utilsBr.MASKS;
  formResult: string = '';
  perfis: Array<Perfil>;

  constructor(private fb: FormBuilder,
    private contaService: ContaService,
    private perfilService: PerfilService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      cpfCnpj: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      perfil: {
        required: 'Selecione o seu perfil',
        email: 'Perfil inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm,
      ativo: ['', [Validators.required]],
      perfil: ['', [Validators.required]],

      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })

    });

    this.preencherPerfis();
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  trocarValidacaoDocumento() {
    if (this.perfilForm().value === this.idPerfilCliente) {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (requerido)";
    }
    else {
    this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  perfilForm(): AbstractControl {
    return this.cadastroForm.get('perfil');
  }

  documento(): AbstractControl {
    return this.cadastroForm.get('cpfCnpj');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.contaService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.cadastroForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  
  preencherPerfis() {
    this.perfilService.buscarPerfis().subscribe(response => {
     if(response) {
       this.perfis = response;
      }
    });
   }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.usuario.endereco.cep = StringUtils.somenteNumeros(this.usuario.endereco.cep);
      this.usuario.cpfCnpj = StringUtils.somenteNumeros(this.usuario.cpfCnpj);
   
      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { 
            var response = {
              userToken: sucesso,
              accessToken: "algumTokenAleatórioPorAqui"
            };
      
            this.processarSucesso(response) 
          },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
