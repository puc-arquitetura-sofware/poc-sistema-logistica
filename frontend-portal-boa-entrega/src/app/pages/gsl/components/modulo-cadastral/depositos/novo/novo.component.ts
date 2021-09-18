import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { Deposito } from '../models/deposito';
import { utilsBr } from 'js-brasil';
import { DepositoService } from '../services/deposito.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { CepConsulta } from 'src/app/pages/models/endereco';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  depositoForm: FormGroup;
  deposito: Deposito ;

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private depositoService: DepositoService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      tipo: {
        required: 'Informe o tipo',
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
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit() {

    this.depositoForm = this.fb.group({
      tipo: ['', [Validators.required]],

      enderecoDeposito: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });


  }

  ngAfterViewInit(): void {
      super.configurarValidacaoFormularioBase(this.formInputElements, this.depositoForm)
  }


  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.depositoService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.depositoForm.patchValue({
      enderecoDeposito: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  adicionarDeposito() {
    if (this.depositoForm.dirty && this.depositoForm.valid) {

      this.deposito = Object.assign({}, this.deposito, this.depositoForm.value);
      this.formResult = JSON.stringify(this.deposito);

      this.deposito.enderecoDeposito.cep = StringUtils.somenteNumeros(this.deposito.enderecoDeposito.cep);

      this.depositoService.registrarDeposito(this.deposito)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.depositoForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Deposito cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/depositos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
