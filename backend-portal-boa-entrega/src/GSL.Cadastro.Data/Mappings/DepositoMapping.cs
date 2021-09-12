using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GSL.Cadastro.Data.Mappings
{
    public class DepositoMapping : IEntityTypeConfiguration<Deposito>
    {
        public void Configure(EntityTypeBuilder<Deposito> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Tipo)
                .IsRequired()
                .HasColumnType("varchar(200)");

            // 1 : 1 => Deposito: EnderecoDeposito
            builder.HasOne(c => c.EnderecoDeposito)
                .WithOne(c => c.Deposito)
                .HasForeignKey<EnderecoDeposito>(x => x.DepositoId);

            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");


            builder.ToTable("Depositos");
        }
    }
}
