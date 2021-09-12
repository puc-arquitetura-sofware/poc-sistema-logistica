using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.SharedKernel.DomainObjects
{
    public class Documento
    {
        public static int DocumentoMaxLength = 14;

        public Documento(string numero)
        {
            Numero = numero;
        }

        public string TipoDocumento
        {
            get {
                if (Numero.Length <= 11)
                {
                    return "PF";
                }
                else
                {
                    return "PJ";
                }
            }
        }

        public string Numero { get; set; }
        public bool Validar(string documento)
        {
            if(Numero.Length <= 11)
            {
                return Cpf.Validar(Numero);
            } else
            {
                return Cnpj.Validar(Numero);
            }

        }
    }
}
