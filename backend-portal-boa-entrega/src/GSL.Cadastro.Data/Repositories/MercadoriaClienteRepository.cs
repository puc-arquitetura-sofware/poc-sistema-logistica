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
    public class MercadoriaClienteRepository : BaseRepository<MercadoriaCliente>, IMercadoriaClienteRepository
    {   
        private readonly CadastroDbContext _context;
        public MercadoriaClienteRepository(CadastroDbContext dbContext)
            : base(dbContext)
        {
            _context = dbContext;
        }
    }
}
