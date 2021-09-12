using GSL.Cadastro.SharedKernel.DomainObjects;
using System;
using System.Text.Json.Serialization;

namespace GSL.Cadastro.Dominio.Models.Entidades
{
    public class Endereco : Entidade, IAggregateRoot
    {
        public Endereco(string logradouro, string numero, string complemento, string bairro, string cep, string cidade, string estado)
        {
            Logradouro = logradouro;
            Numero = numero;
            Complemento = complemento;
            Bairro = bairro;
            Cep = cep;
            Cidade = cidade;
            Estado = estado;
        }

        // EF Constructor
        public Endereco() { }



        //EF Relational
        public Guid UsuarioId { get; set; }
        [JsonIgnore]
        public virtual Usuario Usuario { get; protected set; }


        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }

        public bool Validar()
        {
            return true;
        }

    }
}
