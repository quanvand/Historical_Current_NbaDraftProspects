import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Player } from '../models/player.model';
import { LoadPlayers } from '../action/player.action'; // Correct path for actions

// Define the structure of the state
export interface PlayerStateModel {
  players: Player[];
}

// State configuration
@State<PlayerStateModel>({
  name: 'player',
  defaults: {
    players: [], // Default empty array
  },
})
export class PlayerState {
  // Selector to expose the players array
  @Selector()
  static players(state: PlayerStateModel): Player[] {
    return state.players;
  }

  // Handle the LoadPlayers action
  @Action(LoadPlayers)
  loadPlayers(ctx: StateContext<PlayerStateModel>, action: LoadPlayers) {
    const state = ctx.getState();
    console.log('Current State:', state); // Debug: Log current state
    console.log('Action Payload:', action.payload); // Debug: Log incoming players

    ctx.patchState({
      players: action.payload, // Update the players in state
    });

    console.log('Updated State:', ctx.getState()); // Debug: Log updated state
  }
}
