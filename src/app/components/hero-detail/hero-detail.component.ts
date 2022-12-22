import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Comics,
  ComicsItem,
  Result,
  StoriesItem,
} from 'src/app/interfaces/heroDetail.interface';
import { ApiMarvelService } from 'src/app/services/api-marvel.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass'],
})
export class HeroDetailComponent implements OnInit {
  hero: Result[] = [];
  comics: ComicsItem[] = [];
  series: ComicsItem[] = [];
  stories: StoriesItem[] = [];
  constructor(
    private readonly service: ApiMarvelService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getHero(id).subscribe((data) => {
      data.data.results.forEach((element) => {
        this.comics = element.comics.items;
        this.series = element.series.items;
        this.stories = element.stories.items;
      });
      this.hero = data.data.results;
    });
  }
}
