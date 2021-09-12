using GSL.Cadastro.SharedKernel.DomainObjects;
using System;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class MercadoriaFornecedor : Entidade, IAggregateRoot
    {
        public MercadoriaFornecedor(Guid mercadoriaId, Guid fornecedorId)
        {
            FornecedorId = fornecedorId;
            MercadoriaId = mercadoriaId;
        }

        public Guid FornecedorId { get; set; }
        public Usuario Fornecedor { get; set; }
        public Guid MercadoriaId { get; set; }
        public Mercadoria Mercadoria{ get; set; }

    }
}
