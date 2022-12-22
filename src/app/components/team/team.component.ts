import { Component, OnInit } from '@angular/core';
import { MyTeamService } from '../../services/my-team.service';
import { HeroTeam } from '../../interfaces/heroTeam.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoTeam } from 'src/app/interfaces/infoTeam.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  infoForm!: FormGroup;
  team: HeroTeam[] = [];
  infoTeam!: InfoTeam;
  constructor(
    private readonly service: MyTeamService,
    private readonly fb: FormBuilder
  ) {
    this.infoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.service.getTeam().subscribe((data) => {
      this.team = data;
    });
    this.service.getInfoTeam().subscribe((data) => {
      if (data.length > 0) {
        data.forEach((element) => {
          this.infoTeam = element;
        });
      }
    });
  }

  addInfo() {
    const { value } = this.infoForm;
    if (this.infoTeam !== undefined) {
      this.service.deleteInfoTeam(this.infoTeam.id);
    }
    this.service.addInfoTeam(value).then((data) => {
      if (data) {
        alert('Información del equipo añadido');
        this.infoForm.reset();
      }
    });
  }

  deleteHero(hero: HeroTeam) {
    let decision = confirm('¿Estás seguro de eliminar el héroe de tu equipo?');
    if (decision) {
      this.service.deleteHero(hero);
    }
  }
}
