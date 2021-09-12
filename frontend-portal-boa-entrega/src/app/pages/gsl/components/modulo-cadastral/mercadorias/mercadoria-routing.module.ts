import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MercadoriaAppComponent } from './mercadoria.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { MercadoriaGuard } from './services/mercadoria.guard';
import { MercadoriaResolve } from './services/mercadoria.resolve';


const mercadoriaRouterConfig: Routes = [
    {
        path: '', component: MercadoriaAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [MercadoriaGuard],
                canActivate: [MercadoriaGuard],
                // data: [{ claim: { nome: 'Mercadoria', valor: 'Adicionar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [MercadoriaGuard],
                // data: [{ claim: { nome: 'Mercadoria', valor: 'Atualizar' } }],
                resolve: {
                    mercadoria: MercadoriaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    mercadoria: MercadoriaResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [MercadoriaGuard],
                // data: [{ claim: { nome: 'Mercadoria', valor: 'Excluir' } }],
                resolve: {
                    mercadoria: MercadoriaResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mercadoriaRouterConfig)
    ],
    exports: [RouterModule]
})
export class MercadoriaRoutingModule { }