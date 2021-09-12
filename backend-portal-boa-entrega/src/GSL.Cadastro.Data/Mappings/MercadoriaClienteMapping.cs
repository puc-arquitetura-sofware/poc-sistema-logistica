using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GSL.Cadastro.Data.Mappings
{
    public class MercadoriaClienteMapping : IEntityTypeConfiguration<MercadoriaCliente>
    {
        public void Configure(EntityTypeBuilder<MercadoriaCliente> builder)
        {

            builder.HasKey(md => new { md.MercadoriaId, md.ClienteId});

            builder.HasOne(md => md.Mercadoria)
                .WithMany(m => m.MercadoriaClientes)
                .HasForeignKey(md => md.MercadoriaId);

            builder.HasOne(md => md.Cliente)
                .WithMany(d => d.MercadoriaClientes)
                .HasForeignKey(md => md.ClienteId);


            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");


            builder.ToTable("MercadoriaClientes");
        }
    }
}
