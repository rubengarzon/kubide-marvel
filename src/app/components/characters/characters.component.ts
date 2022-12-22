import { MyTeamService } from './../../services/my-team.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Character, Result } from 'src/app/interfaces/character.interface';
import { ApiMarvelService } from 'src/app/services/api-marvel.service';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { HeroTeam } from 'src/app/interfaces/heroTeam.interface';
import { Thumbnail } from '../../interfaces/character.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass'],
})
export class CharactersComponent implements OnInit {
  listCharacters: Result[] = [];
  limit: number = 10;
  search = new FormControl('');
  flag: boolean = false;

  constructor(
    private readonly service: ApiMarvelService,
    private readonly serviceTeam: MyTeamService
  ) {
    this.search.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search !== ''),
        tap((search) =>
          this.service.searchHeroByName(search).subscribe((data: Character) => {
            this.listCharacters = [];
            this.listCharacters = data.data.results;
            this.flag = true;
          })
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.service.getAllCharacters(this.limit).subscribe((data: Character) => {
      this.listCharacters = data.data.results;
      this.flag = false;
    });
  }
  /**
   * Añadir Heroe al equipo
   * @param hero
   */
  addHero(hero: Result) {
    const { id, name, thumbnail } = hero;

    const myHero: HeroTeam = {
      id: id.toString(),
      nombre: name,
      img: thumbnail.path + thumbnail.extension,
    };
    this.serviceTeam.addHero(myHero).then((hero) => {
      if (hero) {
        alert('Heroe añadido al equipo');
      }
    });
  }

  onScroll(): void {
    if (this.flag === false) {
      if (this.limit < 100) {
        // limite api 100 registros
        this.limit = this.limit + 5;
        this.service
          .getAllCharacters(this.limit)
          .subscribe((data: Character) => {
            this.listCharacters = data.data.results;
          });
      }
    }
  }
}
