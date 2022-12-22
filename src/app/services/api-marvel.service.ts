import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character.interface';
import { Observable } from 'rxjs';
import { HeroDetail } from '../interfaces/heroDetail.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiMarvelService {
  constructor(private readonly http: HttpClient) {}
  /**
   * Devuelve un numero limitado de heroes
   * @param limit
   * @returns Observable
   */
  getAllCharacters(limit: number): Observable<Character> {
    return this.http.get<Character>(
      `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=dfed52e894e7b99d5fd238f50152e6d9&hash=c757d71c899b6e392d04b2b5dc6d7e1a&limit=${limit}`
    );
  }
  /**
   * Devuelve un heroe
   * @param id
   * @returns Observable
   */
  getHero(id: string | null): Observable<HeroDetail> {
    return this.http.get<HeroDetail>(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=dfed52e894e7b99d5fd238f50152e6d9&hash=c757d71c899b6e392d04b2b5dc6d7e1a`
    );
  }
}
