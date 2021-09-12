using GSL.Cadastro.Api.Configuration.Mappers;
using GSL.Cadastro.Dominio.Interfaces;
using GSL.Cadastro.Dominio.Models.Entidades;
using GSL.Cadastro.Dominio.Models.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GSL.Cadastro.Api.Controllers
{
    [Route("api/deposito")]
    [ApiController]
    public class DepositoController : MainController
    {
        private readonly IDepositoRepository _depositoRepository;

        public DepositoController(IDepositoRepository depositoRepository)
        {
            _depositoRepository = depositoRepository;
        }


        [HttpGet()]
        [ProducesResponseType(typeof(List<DepositoViewModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> BuscarTodosDepositos()
        {

            var depositos = await _depositoRepository.ObterTodosAsync();

            var listDepositos = new List<DepositoViewModel>();

            listDepositos.Add(new DepositoViewModel(
                "Galpão",
                new EnderecoDepositoViewModel("Rua dois", "40", "Casa", "Jardim Itapolis", "03938172", "São Paulo", "SP")
                ));

            foreach (var deposito in depositos)
            {
                listDepositos.Add(MapperUtil.MapperDepositoToDepositoViewModel(deposito));
            }

            return CustomResponse(listDepositos);

        }


        [HttpGet("id")]
        [ProducesResponseType(typeof(DepositoViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> ObterDepositoPorId([FromQuery] Guid id)
        {
            var deposito = await _depositoRepository.ObterPorIdAsync(id);
            return deposito == null ? NotFound() : CustomResponse(MapperUtil.MapperDepositoToDepositoViewModel(deposito));
        }

        [HttpPost("novo-deposito")]
        [ProducesResponseType(typeof(DepositoViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        [AllowAnonymous]
        public async Task<IActionResult> Salvar([FromBody] DepositoViewModel depositoViewModel)
        {
            var usuario = MapperUtil.MapperDepositoViewModelToDeposito(depositoViewModel);

            await _depositoRepository.AdicionarAsync(usuario);

            return CustomResponse(MapperUtil.MapperDepositoToDepositoViewModel(usuario));
        }

        [HttpPut("id")]
        [ProducesResponseType(typeof(DepositoViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Atualizar([FromQuery] Guid id, [FromBody] DepositoViewModel depositoViewModel)
        {
            var depositoExist = await _depositoRepository.ObterPorIdAsync(id);

            if (depositoExist == null)
                throw new NullReferenceException($"a propriedade { nameof(id) } deve ser informada");


            var deposito = MapperUtil.MapperDepositoViewModelToDeposito(depositoViewModel);
            var idDeposito = depositoExist.Id;
            depositoExist = deposito;
            depositoExist.Id = idDeposito;


            await _depositoRepository.AtualizarAsync(depositoExist);

            return CustomResponse(MapperUtil.MapperDepositoToDepositoViewModel(depositoExist));
        }

        [HttpDelete("id")]
        [ProducesResponseType(typeof(DepositoViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Deletar([FromQuery] Guid id)
        {
            var depositoExist = await _depositoRepository.ObterPorIdAsync(id);

            if (depositoExist == null)
                throw new NullReferenceException($"a propriedade { nameof(id) } deve ser informada");



            await _depositoRepository.RemoverAsync(depositoExist);

            return CustomResponse(MapperUtil.MapperDepositoToDepositoViewModel(depositoExist));
        }

        [HttpPut("endereco/id")]
        [ProducesResponseType(typeof(EnderecoDepositoViewModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.Forbidden)]
        public async Task<IActionResult> AtualizarEndereco([FromQuery] Guid id, [FromBody] EnderecoDepositoViewModel enderecoDepositoViewModel)
        {
            var enderecoDepositoExist = await _depositoRepository.ObterEnderecoPorDepositoIdAsync(id);

            if (enderecoDepositoExist == null)
                throw new NullReferenceException($"a propriedade { nameof(id) } deve ser informada");


            var enderecoDeposito = MapperUtil.MapperEnderecoDepositoViewModelToEnderecoDeposito(enderecoDepositoViewModel);
            var idEnderecoId = enderecoDepositoExist.Id;
            enderecoDepositoExist = enderecoDeposito;
            enderecoDepositoExist.Id = idEnderecoId;


            await _depositoRepository.AtualizarEnderecoAsync(enderecoDepositoExist);

            return CustomResponse(MapperUtil.MapperDepositoToDepositoViewModel(enderecoDepositoExist));
        }

    }
}
