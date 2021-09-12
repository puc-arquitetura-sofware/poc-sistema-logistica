using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GSL.Cadastro.Data.Mappings
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(c => c.Password)
              .IsRequired()
              .HasColumnType("varchar(200)");

            builder.Property(c => c.Ativo)
                .IsRequired()
                .HasColumnType("bit");

            builder.Property(c => c.CriadoEm)
                .IsRequired()
                .HasColumnType("date");

            builder.Property(c => c.AtualizadoEm)
                .IsRequired()
                .HasColumnType("date");


            builder.OwnsOne(c => c.Documento, tf =>
            {
                tf.Property(c => c.Numero)
                    .IsRequired()
                    .HasMaxLength(Documento.DocumentoMaxLength)
                    .HasColumnName("CpfCnpj")
                    .HasColumnType($"varchar({Documento.DocumentoMaxLength})");
            });

            builder.OwnsOne(c => c.Email, tf =>
            {
                tf.Property(c => c.Endereco)
                    .IsRequired()
                    .HasColumnName("Email")
                    .HasColumnType($"varchar({Email.EnderecoMaxLength})");
            });


            // 1 : 1 => Usuario: Endereco
            builder.HasOne(c => c.Endereco)
                .WithOne(c => c.Usuario)
                .HasForeignKey<Endereco>(x => x.UsuarioId);


            // 1 : 1 => Usuario: Perfil
            builder.HasOne(u => u.Perfil)
                .WithOne(u => u.Usuario)
                .HasForeignKey<Perfil>(p => p.UsuarioId);

            builder.ToTable("Usuarios");
        }
    }
}
