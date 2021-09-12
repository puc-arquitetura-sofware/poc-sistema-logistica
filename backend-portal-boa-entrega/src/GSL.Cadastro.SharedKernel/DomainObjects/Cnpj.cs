using GSL.Cadastro.SharedKernel.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.SharedKernel.DomainObjects
{
    public class Cnpj
    {
        public const int CnpjMaxLength = 11;
        public string Numero { get; private set; }

        //Construtor do EntityFramework
        protected Cnpj() { }

        public Cnpj(string numero)
        {
            //if (!Validar(numero)) throw new DomainException("CPF inválido");
            Numero = numero;
        }

        public static bool Validar(string cnpj)
        {
            cnpj = cnpj.ApenasNumeros(cnpj);

            if (cnpj.Length > 14)
                return false;

			cnpj.PadLeft(14, '0');

			int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
			int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
			int soma;
			int resto;
			string digito;
			string tempCnpj;

			cnpj = cnpj.Trim();
			cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");

			if (cnpj.Length != 14)
				return false;
			tempCnpj = cnpj.Substring(0, 12);
			soma = 0;

			for (int i = 0; i < 12; i++)
				soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];

			resto = (soma % 11);

			if (resto < 2)
				resto = 0;
			else
				resto = 11 - resto;

			digito = resto.ToString();
			tempCnpj = tempCnpj + digito;
			soma = 0;

			for (int i = 0; i < 13; i++)
				soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];

			resto = (soma % 11);

			if (resto < 2)
				resto = 0;
			else
				resto = 11 - resto;

			digito = digito + resto.ToString();

			return cnpj.EndsWith(digito);
		}
    }
}
