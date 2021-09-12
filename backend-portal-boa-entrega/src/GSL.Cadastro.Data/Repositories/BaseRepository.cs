using GSL.Cadastro.Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Data.Repositories
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {

        protected readonly CadastroDbContext _dbContext;

        public BaseRepository(CadastroDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual async Task AdicionarAsync(TEntity entity)
        {
            await _dbContext.AddAsync(entity);
            await Commit();
        }

        public virtual async Task AdiconarRangeAsync(List<TEntity> entities)
        {
            await _dbContext.AddRangeAsync(entities);
            await Commit();
        }


        public virtual async Task AtualizarAsync(TEntity entity)
        {
            await Task.Run(() => _dbContext.Update(entity));
            await Commit();
        }

        public virtual async Task AtualizarRangeAsync(List<TEntity> entities)
        {
            await Task.Run(() => _dbContext.UpdateRange(entities));
            await Commit();
        }

        public virtual async Task RemoverAsync(TEntity entity)
        {
            await Task.Run(() => _dbContext.Remove(entity));
            await Commit();
        }

        public virtual async Task<TEntity> ObterPorIdAsync(Guid id) =>
            await _dbContext.Set<TEntity>().FindAsync(id);

        public virtual async Task<IEnumerable<TEntity>> ObterTodosAsync() =>
            await Task.Run(() => _dbContext.Set<TEntity>().AsNoTracking());

        public virtual async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression) =>
            await _dbContext.Set<TEntity>().AnyAsync(expression);

        public async Task Commit() =>
            await _dbContext.SaveChangesAsync();
    }
}
