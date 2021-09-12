using GSL.Cadastro.SharedKernel.DomainObjects;
using System;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class MercadoriaCliente : Entidade, IAggregateRoot
    {
        public MercadoriaCliente(Guid mercadoriaId, Guid clienteId)
        {
            MercadoriaId = mercadoriaId;
            ClienteId = clienteId;
        }

        public Guid ClienteId { get; set; }
        public Usuario Cliente { get; set; }
        public Guid MercadoriaId { get; set; }
        public Mercadoria Mercadoria{ get; set; }

    }
}
