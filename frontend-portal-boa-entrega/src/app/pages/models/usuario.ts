import { Endereco } from './endereco';

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    cpfCnpj: string;
    ativo: boolean;
    perfil: string;
    endereco: Endereco;
    password: string;
    confirmPassword: string;
}