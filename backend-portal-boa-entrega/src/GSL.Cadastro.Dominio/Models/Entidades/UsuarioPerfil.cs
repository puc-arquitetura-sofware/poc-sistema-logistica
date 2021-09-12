using GSL.Cadastro.SharedKernel.DomainObjects;
using System;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class UsuarioPerfil: Entidade
    {
       public Guid UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public Guid PerfilId { get; set; }
        public Perfil Perfil { get; set; }
    }
}
