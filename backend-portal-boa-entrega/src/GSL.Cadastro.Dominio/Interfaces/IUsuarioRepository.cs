using GSL.Cadastro.Dominio.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Interfaces
{
    public interface IUsuarioRepository : IBaseRepository<Usuario>
    {
        //Task AdicionarAsync(Usuario usuario);
        //Task<IEnumerable<Usuario>> ObterTodosAsync();
        Task<Usuario> ObterPorCpfAsync(string cpf);
        Task AdicionarEnderecoAsync(Endereco endereco);
        Task<Endereco> ObterEnderecoPorUsuarioIdAsync(Guid id);
    }
}
