import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

import { MercadoriaService } from '../../../../services/mercadoria.service';
import { MercadoriaBaseComponent } from '../mercadoria-form.base.component';
import { CurrencyUtils } from 'src/app/shared/utils/currency-utils';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends MercadoriaBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

  constructor(private fb: FormBuilder,
    private mercadoriaService: MercadoriaService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {

    this.mercadoriaService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

    this.mercadoriaForm = this.fb.group({
      // fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      // imagem: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarMercadoria() {
    if (this.mercadoriaForm.dirty && this.mercadoriaForm.valid) {
      this.mercadoria = Object.assign({}, this.mercadoria, this.mercadoriaForm.value);

      // this.mercadoria.imagemUpload = this.croppedImage.split(',')[1];
      // this.mercadoria.imagem = this.imagemNome;
      this.mercadoria.valor = CurrencyUtils.StringParaDecimal(this.mercadoria.valor);

      this.mercadoriaService.novoMercadoria(this.mercadoria)
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

    let toast = this.toastr.success('Mercadoria cadastrado com sucesso!', 'Sucesso!');
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }
}

