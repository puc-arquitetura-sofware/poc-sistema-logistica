using GSL.Cadastro.SharedKernel.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class MercadoriaDeposito : Entidade, IAggregateRoot
    {
        public MercadoriaDeposito(Guid mercadoriaId, Guid depositoId, int quantidadeEstoque)
        {
            MercadoriaId = mercadoriaId;
            DepositoId = depositoId;
            QuantidadeEstoque = quantidadeEstoque;
        }

        public Guid MercadoriaId { get; set; }
        public Mercadoria Mercadoria { get; set; }
        public Guid DepositoId { get; set; }
        public Deposito Deposito { get; set; }
        public int QuantidadeEstoque { get; private set; }


    }
}
