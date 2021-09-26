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
import { ClienteService } from '../services/cliente.service';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { Perfil } from 'src/app/models/Perfil';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { MercadoriaCliente } from 'src/app/pages/models/mercadoriaCliente';
import { Mercadoria } from 'src/app/pages/models/mercadoria';
import { MercadoriaService } from 'src/app/pages/gsl/services/mercadoria.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  errorsVinculo: any[] = [];

  public clienteForm: FormGroup;
  public enderecoForm: FormGroup;
  vinculoForm: FormGroup;

  cliente: Usuario;
  endereco: Endereco;
  mercadorias: Mercadoria[] = []
  mercadoriasCliente: Mercadoria[] = []
  mercadoriaCliente: MercadoriaCliente;

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;
  tipoFornecedor: number;
  idPerfilFornecedor = "6fa163ae-dc8a-481e-a829-3ecd0b096122";

  perfis: Array<Perfil>;
  
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private mercadoriaService: MercadoriaService,
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
    this.cliente = this.route.snapshot.data['cliente'];
    this.preencherMercadorias();
    this.preencherMercadoriasCliente();
  }

  ngOnInit() {

    this.clienteForm = this.fb.group({
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

    this.vinculoForm = this.fb.group({
      mercadoriaId: ['', [Validators.required]],
      clienteId: ['', [Validators.required]],
    });


    this.preencherPerfis();
    this.preencherForm();

  }

  preencherForm() {

    this.clienteForm.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      email: this.cliente.email,
      perfil: this.cliente.perfil,
      ativo: this.cliente.ativo,
      cpfCnpj: this.cliente.cpfCnpj
    });

    
    this.vinculoForm.patchValue({
      clienteId: this.cliente.id
      
    });
    
      
    if (this.perfilForm().value === this.idPerfilFornecedor) {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }
    else {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }

    this.enderecoForm.patchValue({
      id: this.cliente.endereco.id,
      logradouro: this.cliente.endereco.logradouro,
      numero: this.cliente.endereco.numero,
      complemento: this.cliente.endereco.complemento,
      bairro: this.cliente.endereco.bairro,
      cep: this.cliente.endereco.cep,
      cidade: this.cliente.endereco.cidade,
      estado: this.cliente.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.perfilForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      super.configurarValidacaoFormularioBase(this.formInputElements, this.clienteForm);
      super.validarFormulario(this.clienteForm);

      super.configurarValidacaoFormularioBase(this.formInputElements, this.clienteForm);
    });
  }

  trocarValidacaoDocumento() {

    if (this.perfilForm().value === this.idPerfilFornecedor) {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (requerido)";
    }
    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (requerido)";
    }

  }

  perfilForm(): AbstractControl {
    return this.clienteForm.get('perfil');
  }

  documento(): AbstractControl {
    return this.clienteForm.get('cpfCnpj');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.clienteService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.clienteForm.patchValue({
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

   preencherMercadorias() {
    this.mercadoriaService.obterTodos().subscribe( 
      mercadoria => {
        this.mercadorias = mercadoria;
      },
      falha => { this.processarFalha(falha) }
      );
  }

  preencherMercadoriasCliente() {
    this.mercadoriaService.obterPorCliente(this.cliente.id).subscribe( 
      mercadoria => {
        this.mercadoriasCliente = mercadoria;
      },
      falha => { this.processarFalha(falha) }
      );
  }

  editarCliente() {
    debugger;
    if (this.clienteForm.dirty && this.clienteForm.valid) {

      this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);
      this.cliente.cpfCnpj = StringUtils.somenteNumeros(this.cliente.cpfCnpj);


      this.clienteService.atualizarUsuario(this.cliente)
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
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-servico-cliente/clientes/listar-todos']);
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
      this.endereco.usuarioId = this.cliente.id;

      this.cliente.endereco = this.endereco;
      this.clienteService.atualizarUsuario(this.cliente)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha) }
        );
    }
  }


  vincularMercadoriaCliente() {
    debugger;
    if (this.vinculoForm.dirty && this.vinculoForm.valid) {
      this.mercadoriaCliente = Object.assign({}, this.mercadoriaCliente, this.vinculoForm.value);
      this.clienteService.vincularMercadoria(this.mercadoriaCliente).subscribe(
        sucesso => {
          var mercadorias = this.mercadoriaService.obterTodos().subscribe(
            mercadorias => {
              debugger;
              this.mercadoriasCliente = mercadorias;
            },
            erro => this.processarFalhaVinculo(erro)
          )

        },
        erro => this.processarFalhaVinculo(erro)
      )
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.cliente.endereco = endereco
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  processarFalhaVinculo(fail: any) {
    this.errorsVinculo = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }


}
