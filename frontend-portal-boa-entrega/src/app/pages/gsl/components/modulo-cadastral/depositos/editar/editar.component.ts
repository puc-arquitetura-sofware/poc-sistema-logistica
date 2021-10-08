import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';
import { Deposito } from '../models/deposito';
import { CepConsulta, EnderecoDeposito } from '../models/enderecoDeposito';
import { utilsBr } from 'js-brasil';
import { DepositoService } from '../services/deposito.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { MercadoriaService } from '../../../../services/mercadoria.service';
import { Mercadoria } from 'src/app/pages/models/mercadoria';
import { MercadoriaDeposito } from 'src/app/pages/models/mercadoriaDeposito';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  errorsVinculo: any[] = [];
  
  
  depositoForm: FormGroup;
  enderecoForm: FormGroup;
  vinculoForm: FormGroup;
  
  deposito: Deposito;
  endereco: EnderecoDeposito;
  mercadorias: Mercadoria[] = []
  mercadoriasDeposito: Mercadoria[] = []
  mercadoriaDeposito: MercadoriaDeposito;

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;
  tipoFornecedor: number;

  constructor(private fb: FormBuilder,
    private depositoService: DepositoService,
    private mercadoriaService: MercadoriaService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
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
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
    this.deposito = this.route.snapshot.data['deposito'];
    
    forkJoin([
      this.mercadoriaService.obterTodos(),
      this.mercadoriaService.obterPorDeposito(this.deposito.id)
      ]).subscribe( 
        results => {
          debugger;
          this.mercadorias = results[0];
          this.mercadoriasDeposito = results[1];  
          this.mercadorias = this.difference(results[0], results[1]);
        },
        falha => { this.processarFalha(falha) }
      );
  }

  
  ngOnInit() {


    this.depositoForm = this.fb.group({
      tipo: ['', [Validators.required]]
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
      depositoId: ''
    });

    this.vinculoForm = this.fb.group({
      mercadoriaId: ['', [Validators.required]],
      depositoId: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });


    this.preencherForm();

  }

  preencherForm() {

    this.depositoForm.patchValue({
      id: this.deposito.id,
      tipo: this.deposito.tipo,
    });

    this.vinculoForm.patchValue({
      depositoId: this.deposito.id
      
    });

    
    this.enderecoForm.patchValue({
      id: this.deposito.enderecoDeposito.id,
      logradouro: this.deposito.enderecoDeposito.logradouro,
      numero: this.deposito.enderecoDeposito.numero,
      complemento: this.deposito.enderecoDeposito.complemento,
      bairro: this.deposito.enderecoDeposito.bairro,
      cep: this.deposito.enderecoDeposito.cep,
      cidade: this.deposito.enderecoDeposito.cidade,
      estado: this.deposito.enderecoDeposito.estado
    });
  }

  ngAfterViewInit() {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.depositoForm);
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

    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });
  }

  preencherMercadorias() {
    this.mercadoriaService.obterTodos().subscribe( 
      mercadoria => {
        this.mercadorias = mercadoria;
        debugger;
      },
      falha => { this.processarFalha(falha) }
      );
  }

  private difference(a1: any, a2: any) {
    var result = [];
    for(var i=0; i < a1.length; i++) { 
      var current = a1[i];
   
       var filtered = a2.filter(a => a.id == current.id);
   
       if(!filtered.length) {
         console.log(current);
        result.push(current);
       }
    }
   
    return result;
  }

  preencherMercadoriasDeposito() {
    this.mercadoriaService.obterPorDeposito(this.deposito.id).subscribe( 
      mercadoria => {
        this.mercadoriasDeposito = mercadoria;
      },
      falha => { this.processarFalha(falha) }
      );
  }

  editarDeposito() {
    if (this.depositoForm.dirty && this.depositoForm.valid) {

      this.deposito = Object.assign({}, this.deposito, this.depositoForm.value);
      this.deposito.enderecoDeposito.cep = StringUtils.somenteNumeros(this.deposito.enderecoDeposito.cep);

      this.depositoService.atualizarDeposito(this.deposito)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Deposito atualizado com sucesso!', 'Sucesso!');
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

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.depositoId = this.deposito.id;

      this.deposito.enderecoDeposito = this.endereco;
      this.depositoService.atualizarDeposito(this.deposito)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha) }
        );
    }
  }

  vincularMercadoriaDeposito() {
    debugger;
    if (this.vinculoForm.dirty && this.vinculoForm.valid) {
      this.mercadoriaDeposito = Object.assign({}, this.mercadoriaDeposito, this.vinculoForm.value);
      this.depositoService.vincularMercadoria(this.mercadoriaDeposito).subscribe(
        sucesso => {
          var mercadorias = this.mercadoriaService.obterTodos().subscribe(
            mercadorias => {
              debugger;
              this.toastr.success('Mercadoria vinculada com sucesso!', 'Sucesso!');
              document.location.reload();
            },
            erro => this.processarFalhaVinculo(erro)
          )

        },
        erro => this.processarFalhaVinculo(erro)
      )
    }
  }

  processarSucessoEndereco(endereco: EnderecoDeposito) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.deposito.enderecoDeposito = endereco
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
