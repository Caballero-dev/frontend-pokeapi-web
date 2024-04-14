import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pag/inicio/inicio.component';
import { InformacionComponent } from './pag/informacion/informacion.component';

const routes: Routes = [
  { path: 'inicio', title: "Pokemones", component: InicioComponent },
  { path: 'informacion/:nombre', title: "Información pokemon",component: InformacionComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: InicioComponent }
];

const extraOptions = {
  useHash: true 
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
