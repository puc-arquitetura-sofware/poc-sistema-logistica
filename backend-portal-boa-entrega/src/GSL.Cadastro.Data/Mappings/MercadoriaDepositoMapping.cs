using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GSL.Cadastro.Data.Mappings
{
    public class MercadoriaDepositoMapping : IEntityTypeConfiguration<MercadoriaDeposito>
    {
        public void Configure(EntityTypeBuilder<MercadoriaDeposito> builder)
        {

            builder.HasKey(md => new { md.MercadoriaId, md.DepositoId });

            builder.HasOne(md => md.Mercadoria)
                .WithMany(m => m.MercadoriaDepositos)
                .HasForeignKey(md => md.MercadoriaId);

            builder.HasOne(md => md.Deposito)
                .WithMany(d => d.MercadoriaDepositos)
                .HasForeignKey(md => md.DepositoId);


            builder.Property(c => c.QuantidadeEstoque)
                .IsRequired()
                .HasColumnType("int");


            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");


            builder.ToTable("MercadoriaDepositos");
        }
    }
}
