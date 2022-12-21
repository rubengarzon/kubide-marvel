import { Component, OnInit } from '@angular/core';
import { Character, Result } from 'src/app/interfaces/character';
import { ApiMarvelService } from 'src/app/services/api-marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass'],
})
export class CharactersComponent implements OnInit {
  listCharacters: Result[] = [];

  constructor(private readonly service: ApiMarvelService) {}

  ngOnInit(): void {
    this.service.getAllCharacters().subscribe((data: Character) => {
      this.listCharacters = data.data.results;
    });
  }

  onScroll(): void {
    console.log('aaaaa');
  }
}
