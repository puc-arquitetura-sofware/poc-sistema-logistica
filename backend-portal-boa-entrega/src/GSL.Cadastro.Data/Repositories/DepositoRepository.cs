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
    public class DepositoRepository : BaseRepository<Deposito>, IDepositoRepository
    {   
        private readonly CadastroDbContext _context;
        public DepositoRepository(CadastroDbContext dbContext)
            : base(dbContext)
        {
            _context = dbContext;
        }

        public override async Task AtualizarAsync(Deposito deposito)
        {
            await Task.Run(() => _context.Depositos.Update(deposito));
            await Commit();
        }

        public override async Task RemoverAsync(Deposito deposito)
        {
            await Task.Run(() => _context.EnderecoDepositos.Remove(deposito.EnderecoDeposito));
            await Task.Run(() => _context.Depositos.Remove(deposito));
            await Commit();
        }


        public async Task AtualizarEnderecoAsync(EnderecoDeposito endereco)
        {
            await Task.Run(() => _context.EnderecoDepositos.Update(endereco));
            await Commit();
        }

        public override async Task<Deposito> ObterPorIdAsync(Guid id) =>
                await _context.Depositos.Include(x => x.EnderecoDeposito).FirstOrDefaultAsync(u => u.Id == id);

        public async Task<EnderecoDeposito> ObterEnderecoPorDepositoIdAsync(Guid id) =>
            await _context.EnderecoDepositos.FirstOrDefaultAsync(e => e.Id == id);

        public override async Task<IEnumerable<Deposito>> ObterTodosAsync() =>
            await _context.Depositos.Include(x => x.EnderecoDeposito).AsNoTracking().ToListAsync();
        public async Task AdicionarEnderecoAsync(EnderecoDeposito enderecoDeposito)
        {
            await _context.EnderecoDepositos.AddAsync(enderecoDeposito);
            await Commit();
        }

    }
}
