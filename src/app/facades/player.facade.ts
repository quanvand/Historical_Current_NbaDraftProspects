import { Injectable } from '@angular/core';
import { Store, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { LoadPlayers } from '../action/player.action'; // Correct path for actions

@Injectable({
  providedIn: 'root',
})
export class PlayerFacade {
  players$: Observable<Player[]>;

  constructor(private store: Store) {
    // Use store.select to get the players array
    this.players$ = this.store.select((state: any) => state.player.players);
  }

  // Dispatch LoadPlayers action
  loadPlayers(players: Player[]) {
    console.log('Dispatching LoadPlayers action with:', players);
    this.store.dispatch(new LoadPlayers(players));
  }
}
