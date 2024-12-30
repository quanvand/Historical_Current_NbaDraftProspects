import { Player } from '../models/player.model';

export class LoadPlayers {
  static readonly type = '[Player] Load Players'; // Action identifier
  constructor(public payload: Player[]) {} // Payload to pass players
}
