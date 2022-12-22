import { Component, OnInit } from '@angular/core';
import { MyTeamService } from '../../services/my-team.service';
import { HeroTeam } from '../../interfaces/heroTeam.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  team: HeroTeam[] = [];
  constructor(private readonly service: MyTeamService) {}
  ngOnInit(): void {
    this.service.getTeam().subscribe((data) => {
      this.team = data;
    });
  }

  deleteHero(hero: HeroTeam) {
    let decision = confirm('¿Estás seguro de eliminar el héroe de tu equipo?');
    if (decision) {
      this.service.deleteHero(hero);
    }
  }
}
