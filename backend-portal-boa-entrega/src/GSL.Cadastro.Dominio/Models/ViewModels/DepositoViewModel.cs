using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class DepositoViewModel
    {
        public DepositoViewModel(){}
        public DepositoViewModel(string tipo, EnderecoDepositoViewModel enderecoDeposito)
        {
            Tipo = tipo;
            EnderecoDeposito = enderecoDeposito;
        }

        public Guid Id { get; set; }
        public string Tipo { get; set; }

        public EnderecoDepositoViewModel EnderecoDeposito { get; set; }
    }
}
