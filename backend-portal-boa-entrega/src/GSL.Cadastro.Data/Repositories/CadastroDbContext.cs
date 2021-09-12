using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Linq;

namespace GSL.Cadastro.Data.Repositories
{
    public class CadastroDbContext: DbContext
    {
        //private IDbContextTransaction _transaction;
        public DbContextOptions<CadastroDbContext> _options;

        public CadastroDbContext(DbContextOptions<CadastroDbContext> options)
            : base(options)
        {
            //Database.EnsureCreated();
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Deposito> Depositos{ get; set; }
        public DbSet<EnderecoDeposito> EnderecoDepositos{ get; set; }
        public DbSet<MercadoriaDeposito> MercadoriaDepositos { get; set; }
        public DbSet<Mercadoria> Mercadorias { get; set; }
        public DbSet<MercadoriaFornecedor> MercadoriaFornecedores { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Documento>();
            modelBuilder.Ignore<Cpf>();
            modelBuilder.Ignore<Cnpj>();
            modelBuilder.Ignore<Email>();

            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(
                e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CadastroDbContext).Assembly);
        }

    }
}