using GSL.Cadastro.Dominio.Interfaces;
using GSL.Cadastro.Dominio.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Data.Repositories
{
    public class UsuarioRepository : BaseRepository<Usuario>, IUsuarioRepository
    {
        private readonly CadastroDbContext _context;
        public UsuarioRepository(CadastroDbContext dbContext)
            : base(dbContext)
        {
            _context = dbContext;
        }

        public override async Task AdicionarAsync(Usuario usuario)
        {
            await  _context.Usuarios.AddAsync(usuario);
            await Commit();
        }

        public async Task AdicionarEnderecoAsync(Endereco endereco)
        {
            await _context.Enderecos.AddAsync(endereco);
            await Commit();
        }

        public override async Task<Usuario> ObterPorIdAsync(Guid id) =>
                await _context.Usuarios.Include(x => x.Endereco).FirstOrDefaultAsync(u => u.Id == id);

        public async Task<Endereco> ObterEnderecoPorUsuarioIdAsync(Guid id) =>
            await _context.Enderecos.FirstOrDefaultAsync(e => e.UsuarioId == id);

        public async Task<Usuario> ObterPorCpfAsync(string cpf) =>
            await _context.Usuarios.Include(e => e.Endereco).FirstOrDefaultAsync(c => c.Documento.Numero == cpf);

        public override async Task<IEnumerable<Usuario>> ObterTodosAsync() =>
            await _context.Usuarios.Include(e => e.Endereco).AsNoTracking().ToListAsync();

        private async Task Commit() =>
            await _context.SaveChangesAsync();
    }
}
