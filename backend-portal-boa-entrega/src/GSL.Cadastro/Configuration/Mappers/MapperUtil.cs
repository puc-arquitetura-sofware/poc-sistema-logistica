using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.Dominio.Models.ViewModels;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSL.Cadastro.Api.Configuration.Mappers
{
    public static class MapperUtil
    {
        #region Metodos Usuarios
        public static Usuario MapperUsuarioViewModelToUsuario(UsuarioViewModel usuarioViewModel)
        {
            var obj = new { usuarioViewModel.Id, usuarioViewModel.Nome, usuarioViewModel.Bloqueado, usuarioViewModel.Ativo };
            var usuario = obj.Adapt<Usuario>();

            usuario.AtribuirEndereco(usuarioViewModel.Endereco.Adapt<Endereco>());
            usuario.Documento = new Documento(usuarioViewModel.CpfCnpj);
            usuario.Email = new Email(usuarioViewModel.Email);


            return usuario;
        }
        public static UsuarioViewModel MapperUsuarioToUsuarioViewModel(Usuario usuario)
        {
            var endereco = usuario.Endereco.Adapt<EnderecoViewModel>();
            var usuarioViewModel = new UsuarioViewModel(usuario.Nome, usuario.Email.Endereco, usuario.Documento.Numero, usuario.Bloqueado, usuario.Ativo, endereco);
            usuarioViewModel.Id = usuario.Id;
            return usuarioViewModel;
        }
        #endregion

        #region Metodos Perfil
        public static Perfil MapperPerfilViewModelToPerfil(PerfilViewModel perfilViewModel)
        {
            var perfil = perfilViewModel.Adapt<Perfil>();
            return perfil;
        }
        public static PerfilViewModel MapperPerfilToPerfilViewModel(Perfil perfil)
        {
            var perfilViewModel = perfil.Adapt<PerfilViewModel>();
            return perfilViewModel;
        }
        #endregion

        #region Metodos Mercadoria
        public static Mercadoria MapperMercadoriaViewModelToMercadoria(MercadoriaViewModel mercadoriaViewModel)
        {

            var mercadoria = mercadoriaViewModel.Adapt<Mercadoria>();
            mercadoria.AtribuirFornecedor(mercadoriaViewModel.FuncionarioId);
            return mercadoria;
        }

        public static MercadoriaViewModel MapperMercadoriaToMercadoriaViewModel(Mercadoria mercadoria)
        {
            var mercadoriaViewModel = new MercadoriaViewModel(mercadoria.Nome, mercadoria.Descricao, mercadoria.Valor, mercadoria.Ativo, mercadoria.FornecedorId);
            mercadoriaViewModel.Id = mercadoria.Id;
            return mercadoriaViewModel;
        }
        #endregion


        #region Metodos Depositos
        public static Deposito MapperDepositoViewModelToDeposito(DepositoViewModel usuarioViewModel)
        {
            var obj = new { usuarioViewModel.Tipo };
            var deposito = obj.Adapt<Deposito>();
            var endereco = usuarioViewModel.EnderecoDeposito.Adapt<EnderecoDeposito>();
            deposito.AtribuirEndereco(endereco);

            return deposito;
        }
        public static DepositoViewModel MapperDepositoToDepositoViewModel(Deposito deposito)
        {
            var endereco = deposito.EnderecoDeposito.Adapt<EnderecoDepositoViewModel>();
            var depositoViewModel = new DepositoViewModel(deposito.Tipo, endereco);
            depositoViewModel.Id = deposito.Id;
            return depositoViewModel;
        }

        public static EnderecoDeposito MapperEnderecoDepositoViewModelToEnderecoDeposito(EnderecoDepositoViewModel enderecoDepositoViewModel)
        {
            var endereco = enderecoDepositoViewModel.Adapt<EnderecoDeposito>();
            return endereco;
        }
        public static EnderecoDepositoViewModel MapperDepositoToDepositoViewModel(EnderecoDeposito enderecoDeposito)
        {
            var endereco = enderecoDeposito.Adapt<EnderecoDepositoViewModel>();
       
            return endereco;
        }
        #endregion
    }
}
