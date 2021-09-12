using GSL.Cadastro.Api.Configuration.Mappers;
using GSL.Cadastro.Dominio.Interfaces;
using GSL.Cadastro.Dominio.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GSL.Cadastro.Api.Controllers
{
    [Route("api/perfil")]
    [ApiController]
    public class PerfilController : MainController
    {
        private readonly IPerfilRepository _perfilRepository;

        public PerfilController(IPerfilRepository perfilRepository)
        {
            _perfilRepository = perfilRepository;
        }

        [HttpGet()]
        [ProducesResponseType(typeof(List<PerfilViewModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> BuscarTodosUsuarios()
        {

            var perfis = await _perfilRepository.ObterTodosAsync();

            var listPerfis = new List<PerfilViewModel>();

            listPerfis.Add(new PerfilViewModel(
                Guid.Parse("5fa163ae-dc8a-481e-a829-3ecd0b096121"),
                "Cliente"                
                ));

            listPerfis.Add(new PerfilViewModel(
                Guid.Parse("6fa163ae-dc8a-481e-a829-3ecd0b096122"),
                "Fornecedor"
                ));

            foreach (var perfil in perfis)
            {
                listPerfis.Add(MapperUtil.MapperPerfilToPerfilViewModel(perfil));
            }

            return CustomResponse(listPerfis);

        }


        [HttpGet(":id")]
        [ProducesResponseType(typeof(PerfilViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> ObterUsuarioPorId([FromQuery] Guid id)
        {
            var perfil = await _perfilRepository.ObterPorIdAsync(id);
            return perfil == null ? NotFound() : CustomResponse(perfil);
        }

        [HttpPost()]
        [ProducesResponseType(typeof(PerfilViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Salvar([FromBody] PerfilViewModel perfilViewModel)
        {
            var perfil = MapperUtil.MapperPerfilViewModelToPerfil(perfilViewModel);

            await _perfilRepository.AdicionarAsync(perfil);

            return CustomResponse(MapperUtil.MapperPerfilToPerfilViewModel(perfil));
        }

        [HttpPut(":id")]
        [ProducesResponseType(typeof(PerfilViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Atualizar([FromQuery] Guid id, [FromBody] PerfilViewModel perfilViewModel)
        {
            var perfilExist = await _perfilRepository.ObterPorIdAsync(id);

            if (perfilExist == null)
                throw new NullReferenceException($"a propriedade { nameof(id) } deve ser informada");

            var perfil = MapperUtil.MapperPerfilViewModelToPerfil(perfilViewModel);

            await _perfilRepository.AtualizarAsync(perfil);

            return CustomResponse(MapperUtil.MapperPerfilToPerfilViewModel(perfil));
        }

    }
}
