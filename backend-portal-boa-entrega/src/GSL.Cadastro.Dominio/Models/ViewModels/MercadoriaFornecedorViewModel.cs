using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class MercadoriaClienteViewModel
    {
        public MercadoriaClienteViewModel(MercadoriaViewModel mercadoriaViewModel, UsuarioViewModel usuarioViewModel)
        {
            MercadoriaViewModel = mercadoriaViewModel;
            UsuarioViewModel = usuarioViewModel;
        }

        public MercadoriaViewModel MercadoriaViewModel { get; set; }
        public UsuarioViewModel UsuarioViewModel{ get; set; }
    }
}
