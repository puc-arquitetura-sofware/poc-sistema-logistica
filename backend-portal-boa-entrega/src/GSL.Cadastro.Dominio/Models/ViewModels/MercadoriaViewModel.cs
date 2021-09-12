using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class MercadoriaViewModel
    {
        public MercadoriaViewModel(string nome, string descricao, double valor, bool ativo, Guid funcionarioId)
        {
            Nome = nome;
            Descricao = descricao;
            Valor = valor;
            Ativo = ativo;
            FuncionarioId = funcionarioId;
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Valor { get; set; }
        public bool Ativo { get; set; }
        public Guid FuncionarioId { get;  set; }


    }
}
