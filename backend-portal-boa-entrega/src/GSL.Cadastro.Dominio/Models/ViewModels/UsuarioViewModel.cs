using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Models.ViewModels
{
    public class UsuarioViewModel
    {
        public UsuarioViewModel(string nome, string email, string cpfCnpj, bool bloqueado, bool ativo, EnderecoViewModel endereco)
        {
            Nome = nome;
            Email = email;
            CpfCnpj = cpfCnpj;
            Bloqueado = bloqueado;
            Ativo = ativo;
            Endereco = endereco;
        }
        public UsuarioViewModel () { }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CpfCnpj { get; set; }
        public bool Bloqueado { get; set; }
        public bool Ativo { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Perfil { get; set; }
        public EnderecoViewModel Endereco { get; set; }
    }
}
