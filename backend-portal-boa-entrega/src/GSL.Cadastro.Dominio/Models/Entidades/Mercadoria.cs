using GSL.Cadastro.SharedKernel.DomainObjects;
using System;
using System.Collections.Generic;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class Mercadoria: Entidade, IAggregateRoot
    {
        public Mercadoria(string nome, string descricao, double valor, bool ativo, Guid fornecedorId)
        {
            Nome = nome;
            Descricao = descricao;
            Valor = valor;
            Ativo = ativo;
            FornecedorId = fornecedorId;
        }

        public Mercadoria() { }

        public string Nome { get; private set; }
        public string Descricao { get; private set; }
        public double Valor { get; private set; }
        public bool Ativo { get; private set; }
        public Guid FornecedorId { get; private set; }
        
        //EF Relational
        public ICollection<MercadoriaDeposito> MercadoriaDepositos { get; set; }
        public ICollection<MercadoriaFornecedor> MercadoriaFornecedores { get; set; }
        public ICollection<MercadoriaCliente> MercadoriaClientes { get; set; }

        public void AtribuirFornecedor(Guid fornecedorId)
        {
            FornecedorId = fornecedorId;
        }
        public bool EstaDisponivel(int quantidade)
        {
            return true;
        }
    }
}
