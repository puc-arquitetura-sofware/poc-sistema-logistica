using GSL.Cadastro.SharedKernel.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class Perfil: Entidade
    {
        public string Descricao { get; set; }

        public bool Ativo { get; set; }

        //EF Relational
        public Guid UsuarioId { get; set; }
        [JsonIgnore]
        public virtual Usuario Usuario { get; protected set; }
    }
}
