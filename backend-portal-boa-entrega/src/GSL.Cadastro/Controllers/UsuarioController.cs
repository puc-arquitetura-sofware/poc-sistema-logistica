using GSL.Cadastro.Api.Configuration.Mappers;
using GSL.Cadastro.Dominio.Interfaces;
using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.Dominio.Models.ViewModels;
using GSL.Cadastro.SharedKernel.DomainObjects;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GSL.Cadastro.Api.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : MainController
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IPerfilRepository _perfilRepository;

        public UsuarioController(IUsuarioRepository clienteRepository, IPerfilRepository perfilRepository)
        {
            _usuarioRepository = clienteRepository;
            _perfilRepository = perfilRepository;
        }

        [HttpGet()]
        [ProducesResponseType(typeof(List<UsuarioViewModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> BuscarTodosUsuarios()
        {

            var usuarios = await _usuarioRepository.ObterTodosAsync();

            var listUsuario = new List<UsuarioViewModel>();

            listUsuario.Add(new UsuarioViewModel(
                "Douglas",
                "d.modesto@boaentrega.com.br",
                "34189871842",
                false,
                false,
                new EnderecoViewModel("Rua dois", "40", "Casa", "Jardim Itapolis", "03938172", "São Paulo", "SP")
                ));

            foreach (var usuario in usuarios)
            {
                listUsuario.Add(MapperUtil.MapperUsuarioToUsuarioViewModel(usuario));
            }

            return CustomResponse(listUsuario);

        }


        [HttpGet(":id")]
        [ProducesResponseType(typeof(UsuarioViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> ObterUsuarioPorId([FromQuery] Guid id)
        {
            var usuario = await _usuarioRepository.ObterPorIdAsync(id);
            return usuario == null ? NotFound() : CustomResponse(usuario);
        }

        [HttpPost("nova-conta")]
        [ProducesResponseType(typeof(UsuarioViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Salvar([FromBody] UsuarioViewModel usuarioViewModel)
        {
            var usuario = MapperUtil.MapperUsuarioViewModelToUsuario(usuarioViewModel);

            await _usuarioRepository.AdicionarAsync(usuario);
            var usuarioNovo = await _usuarioRepository.ObterPorCpfAsync(usuarioViewModel.CpfCnpj);
            return CustomResponse(MapperUtil.MapperUsuarioToUsuarioViewModel(usuarioNovo));
        }

        [HttpPut("/:id")]
        [ProducesResponseType(typeof(UsuarioViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Atualizar([FromQuery] Guid id, [FromBody] UsuarioViewModel usuarioViewModel)
        {
            var usuarioExist = await _usuarioRepository.ObterPorIdAsync(id);

            if (usuarioExist == null)
                throw new NullReferenceException($"a propriedade { nameof(id) } deve ser informada");


            var usuario = MapperUtil.MapperUsuarioViewModelToUsuario(usuarioViewModel);

            await _usuarioRepository.AtualizarAsync(usuario);
            var usuarioAtualizado = await _usuarioRepository.ObterPorCpfAsync(usuarioViewModel.CpfCnpj);

            return CustomResponse(MapperUtil.MapperUsuarioToUsuarioViewModel(usuarioAtualizado));
        }

        [HttpGet(":cpfCnpj")]
        [ProducesResponseType(typeof(UsuarioViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> ObterUsuarioPorCpf([FromQuery] string cpfCnpj)
        {
            var usuario = await _usuarioRepository.ObterPorCpfAsync(cpfCnpj);
            return usuario == null ? NotFound() : CustomResponse(usuario);
        }


        [HttpPut(":usuarioId/:perfilId")]
        [ProducesResponseType(typeof(UsuarioViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> VincularMercadoriaDeposito([FromQuery] Guid usuarioId, [FromQuery] Guid perfilId)
        {
            var usuarioExist = await _usuarioRepository.ObterPorIdAsync(usuarioId);

            if (usuarioExist == null)
                throw new NullReferenceException($"a propriedade { nameof(usuarioId) } deve ser informada");

            var perfilExist = await _perfilRepository.ObterPorIdAsync(perfilId);

            if (perfilExist == null)
                throw new NullReferenceException($"a propriedade { nameof(perfilId) } deve ser informada");


            usuarioExist.AtribuirPerfil(perfilExist);
            await _usuarioRepository.AtualizarAsync(usuarioExist);

            var usuarioViewModel = MapperUtil.MapperUsuarioToUsuarioViewModel(usuarioExist);
            return CustomResponse(usuarioViewModel);
        }


        [HttpPost("entrar")]
        [ProducesResponseType(typeof(LoginViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Login([FromBody] LoginViewModel usuarioViewModel)
        {
            // Rota de Login está mocada, pois não iremos implementar pra demonstração dessa POC.
            return CustomResponse(usuarioViewModel);
        }
    }
}
