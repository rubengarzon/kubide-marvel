import { Injectable } from '@angular/core';
import { HeroTeam } from '../interfaces/heroTeam.interface';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InfoTeam } from '../interfaces/infoTeam.interface';
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
  /**
   * Eliminar heroe del equipo
   * @param hero
   * @returns
   */
  deleteHero(hero: HeroTeam) {
    let docRef = doc(this.firebase, `Team/${hero.id}`);
    return deleteDoc(docRef);
  }

  addInfoTeam(info: InfoTeam) {
    info.id = doc(collection(this.firebase, 'id')).id;
    return addDoc(collection(this.firebase, 'Info'), info);
  }

  getInfoTeam() {
    let infoRef = collection(this.firebase, 'Info');
    return collectionData(infoRef, { idField: 'id' }) as Observable<InfoTeam[]>;
  }

  deleteInfoTeam(infoId: string) {
    let docRef = doc(this.firebase, `Info/${infoId}`);
    return deleteDoc(docRef);
  }

  /*   updateHero(hero: HeroTeam, team: any) {
    let docRef = doc(this.firebase, `Team/${hero.id}`);
    return updateDoc(docRef, team);
  } */
}
