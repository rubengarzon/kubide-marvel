import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMarvelService {
  private readonly API = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=dfed52e894e7b99d5fd238f50152e6d9&hash=c757d71c899b6e392d04b2b5dc6d7e1a&limit=100';

  constructor(private readonly http: HttpClient) {}

  getAllCharacters(): Observable<Character> {
    return this.http.get<Character>(this.API);
  }
}