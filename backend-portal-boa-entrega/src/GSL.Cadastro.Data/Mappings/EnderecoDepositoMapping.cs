using GSL.Cadastro.Dominio.Models.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GSL.Cadastro.Data.Mappings
{
    public class EnderecoDepositoMapping : IEntityTypeConfiguration<EnderecoDeposito>
    {
        public void Configure(EntityTypeBuilder<EnderecoDeposito> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Logradouro)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(c => c.Numero)
                .IsRequired()
                .HasColumnType("varchar(50)");

            builder.Property(c => c.Cep)
                .IsRequired()
                .HasColumnType("varchar(20)");

            builder.Property(c => c.Complemento)
                .HasColumnType("varchar(250)");

            builder.Property(c => c.Bairro)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(c => c.Cidade)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(c => c.Estado)
                .IsRequired()
                .HasColumnType("varchar(50)");

            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.ToTable("Enderecos");
        }
    }
}
