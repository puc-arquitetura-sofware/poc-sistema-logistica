import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { MercadoriaService } from '../../../../services/mercadoria.service';
import { environment } from 'src/environments/environment';
import { MercadoriaBaseComponent } from '../mercadoria-form.base.component';
import { CurrencyUtils } from 'src/app/shared/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends MercadoriaBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;

  constructor(private fb: FormBuilder,
    private mercadoriaService: MercadoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();
    this.mercadoria = this.route.snapshot.data['mercadoria'];
  }

  ngOnInit(): void {

    this.mercadoriaService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

    this.mercadoriaForm = this.fb.group({
      // fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      // imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0]
    });

    this.mercadoriaForm.patchValue({
      // fornecedorId: this.mercadoria.fornecedorId,
      id: this.mercadoria.id,
      nome: this.mercadoria.nome,
      descricao: this.mercadoria.descricao,
      ativo: this.mercadoria.ativo,
      valor: CurrencyUtils.DecimalParaString(this.mercadoria.valor)
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    // this.imagemOriginalSrc = this.imagens + this.mercadoria.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarMercadoria() {
    if (this.mercadoriaForm.dirty && this.mercadoriaForm.valid) {
      this.mercadoria = Object.assign({}, this.mercadoria, this.mercadoriaForm.value);

      // if (this.imageBase64) {
      //   this.mercadoria.imagemUpload = this.imageBase64;
      //   this.mercadoria.imagem = this.imagemNome;
      // }

      this.mercadoria.valor = CurrencyUtils.StringParaDecimal(this.mercadoria.valor);

      this.mercadoriaService.atualizarMercadoria(this.mercadoria)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.mercadoriaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Mercadoria editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/mercadorias/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  }
}

