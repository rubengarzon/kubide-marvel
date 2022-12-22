import { Component, OnInit } from '@angular/core';
import { Character, Result } from 'src/app/interfaces/character.interface';
import { ApiMarvelService } from 'src/app/services/api-marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass'],
})
export class CharactersComponent implements OnInit {
  listCharacters: Result[] = [];
  limit: number = 10;

  constructor(private readonly service: ApiMarvelService) {}

  ngOnInit(): void {
    this.service.getAllCharacters(this.limit).subscribe((data: Character) => {
      this.listCharacters = data.data.results;
    });
  }

  onScroll(): void {
    // limite api 100 registros
    if (this.limit < 100) {
      this.limit = this.limit + 5;
      this.service.getAllCharacters(this.limit).subscribe((data: Character) => {
        this.listCharacters = data.data.results;
      });
    }
  }
}
