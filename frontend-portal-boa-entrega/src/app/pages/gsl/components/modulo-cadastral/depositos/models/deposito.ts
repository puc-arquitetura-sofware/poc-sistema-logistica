import { EnderecoDeposito } from './enderecoDeposito';

export interface Deposito {
    id: string;
    tipo: string;
    enderecoDeposito: EnderecoDeposito ;
}