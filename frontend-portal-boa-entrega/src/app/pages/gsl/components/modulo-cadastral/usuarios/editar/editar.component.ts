import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Usuario } from 'src/app/pages/models/usuario';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { CepConsulta, Endereco } from 'src/app/pages/models/endereco';
import { UsuarioService } from '../services/usuario.service';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { Perfil } from 'src/app/models/Perfil';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  public usuarioForm: FormGroup;
  public enderecoForm: FormGroup;

  usuario: Usuario;
  endereco: Endereco;

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;
  tipoFornecedor: number;
  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";
  perfis: Array<Perfil>;
  
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {

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
    this.usuario = this.route.snapshot.data['usuario'];
  }

  ngOnInit() {

    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fornecedorId: ''
    });

    this.preencherPerfis();
    this.preencherForm();

  }

  preencherForm() {

    this.usuarioForm.patchValue({
      id: this.usuario.id,
      nome: this.usuario.nome,
      email: this.usuario.email,
      perfil: this.usuario.perfil,
      ativo: this.usuario.ativo,
      cpfCnpj: this.usuario.cpfCnpj
    });

    
    if (this.perfilForm().value === this.idPerfilCliente) {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }
    else {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }

    this.enderecoForm.patchValue({
      id: this.usuario.endereco.id,
      logradouro: this.usuario.endereco.logradouro,
      numero: this.usuario.endereco.numero,
      complemento: this.usuario.endereco.complemento,
      bairro: this.usuario.endereco.bairro,
      cep: this.usuario.endereco.cep,
      cidade: this.usuario.endereco.cidade,
      estado: this.usuario.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.perfilForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      super.configurarValidacaoFormularioBase(this.formInputElements, this.usuarioForm);
      super.validarFormulario(this.usuarioForm);

      super.configurarValidacaoFormularioBase(this.formInputElements, this.usuarioForm);
    });
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
    return this.usuarioForm.get('perfil');
  }

  documento(): AbstractControl {
    return this.usuarioForm.get('cpfCnpj');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.usuarioService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.usuarioForm.patchValue({
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

  editarUsuario() {
    debugger;
    if (this.usuarioForm.dirty && this.usuarioForm.valid) {

      this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);
      this.usuario.cpfCnpj = StringUtils.somenteNumeros(this.usuario.cpfCnpj);


      this.usuarioService.atualizarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Usuario atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/usuarios/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  editarEndereco() {
    debugger;
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.usuarioId = this.usuario.id;

      this.usuario.endereco = this.endereco;
      this.usuarioService.atualizarUsuario(this.usuario)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha) }
        );
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.usuario.endereco = endereco
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }


}
