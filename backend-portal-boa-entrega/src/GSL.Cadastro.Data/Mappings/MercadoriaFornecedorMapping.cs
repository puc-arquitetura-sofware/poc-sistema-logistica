using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GSL.Cadastro.Data.Mappings
{
    public class MercadoriaFornecedorMapping : IEntityTypeConfiguration<MercadoriaFornecedor>
    {
        public void Configure(EntityTypeBuilder<MercadoriaFornecedor> builder)
        {

            builder.HasKey(md => new { md.MercadoriaId, md.FornecedorId });

            builder.HasOne(md => md.Mercadoria)
                .WithMany(m => m.MercadoriaFornecedores)
                .HasForeignKey(md => md.MercadoriaId);

            builder.HasOne(md => md.Fornecedor)
                .WithMany(d => d.MercadoriaFornecedores)
                .HasForeignKey(md => md.FornecedorId);


            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");


            builder.ToTable("MercadoriaFornecdores");
        }
    }
}
