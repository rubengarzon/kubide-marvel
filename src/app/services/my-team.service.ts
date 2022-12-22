import { Injectable } from '@angular/core';
import { HeroTeam } from '../interfaces/heroTeam.interface';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class MyTeamService {
  constructor(private readonly firebase: Firestore) {}
  /**
   * Añade un heroe
   * @param hero
   * @returns Promise
   */
  addHero(hero: HeroTeam) {
    hero.id = doc(collection(this.firebase, 'id')).id;
    return addDoc(collection(this.firebase, 'Team'), hero);
  }
  /**
   * Obtiene el equipo de heroes
   * @returns Promise
   */
  getTeam(): Observable<HeroTeam[]> {
    let teamRef = collection(this.firebase, 'Team');
    return collectionData(teamRef, { idField: 'id' }) as Observable<HeroTeam[]>;
  }

  deleteHero(hero: HeroTeam) {
    let docRef = doc(this.firebase, `Team/${hero.id}`);
    return deleteDoc(docRef);
  }
  /**
   * 
   */
  addInfoTeam(){

  }

/*   updateHero(hero: HeroTeam, team: any) {
    let docRef = doc(this.firebase, `Team/${hero.id}`);
    return updateDoc(docRef, team);
  } */
}
