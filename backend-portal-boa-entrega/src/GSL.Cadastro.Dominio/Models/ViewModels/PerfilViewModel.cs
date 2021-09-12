using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class PerfilViewModel
    {

        public PerfilViewModel() { }

        public PerfilViewModel(Guid id, string descricao)
        {
            Id = id;
            Descricao = descricao;
        }

        public Guid Id { get; set; }
        public string Descricao { get; set; }
    }
}
