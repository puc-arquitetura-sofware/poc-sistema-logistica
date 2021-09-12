using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.SharedKernel.DomainObjects
{
    public class Entidade
    {

        public Entidade()
        {
            Id = Guid.NewGuid();
            CriadoEm = DateTime.Now;
            AtualizadoEm = DateTime.Now;
        }
        public Guid Id { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime AtualizadoEm { get; set; }
    }
}
