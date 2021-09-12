using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Dominio.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        Task AdicionarAsync(TEntity entity);
        Task AdiconarRangeAsync(List<TEntity> entities);
        Task AtualizarAsync(TEntity entity);
        Task AtualizarRangeAsync(List<TEntity> entities);
        Task RemoverAsync(TEntity entity);
        Task<TEntity> ObterPorIdAsync(Guid id);
        Task<IEnumerable<TEntity>> ObterTodosAsync();
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> expression);
    }
}
