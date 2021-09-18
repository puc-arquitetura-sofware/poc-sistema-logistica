import { Mercadoria, Fornecedor } from '../../../../models/mercadoria';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { utilsBr } from 'js-brasil';
import { FormBaseComponent } from 'src/app/shared/base-components/form-base.component';


export abstract class MercadoriaBaseComponent extends FormBaseComponent {
    
    mercadoria: Mercadoria;
    fornecedores: Fornecedor[];
    errors: any[] = [];
    mercadoriaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            fornecedorId: {
                required: 'Escolha um fornecedor',
            },
            nome: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 1000 caracteres'
            },
            imagem: {
                required: 'Informe a Imagem',
            },
            valor: {
                required: 'Informe o Valor',
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.mercadoriaForm);
    }
}