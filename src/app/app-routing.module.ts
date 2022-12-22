import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { CharactersComponent } from './components/characters/characters.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: 'detalle/:id', component: HeroDetailComponent },
  { path: 'equipo', component: TeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
