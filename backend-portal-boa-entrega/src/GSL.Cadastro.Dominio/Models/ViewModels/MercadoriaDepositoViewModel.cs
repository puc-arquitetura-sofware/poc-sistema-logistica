using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class MercadoriaDepositoViewModel
    {
        public MercadoriaDepositoViewModel(MercadoriaViewModel mercadoriaViewModel, DepositoViewModel depositoViewModel)
        {
            MercadoriaViewModel = mercadoriaViewModel;
            DepositoViewModel = depositoViewModel;
        }

        public MercadoriaViewModel MercadoriaViewModel { get; set; }
        public DepositoViewModel DepositoViewModel { get; set; }
    }
}
