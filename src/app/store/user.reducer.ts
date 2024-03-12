import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as UserActions from './user.action';


export interface State extends EntityState<User> {
  selectedUserId: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.selectUser, (state, { userId }) => {
    return { ...state, selectedUserId: userId };
  }),
  on(UserActions.loadUsers, (state, { users }) => {
    return adapter.addMany(users, { ...state, selectedUserId: null });
  }),
  on(UserActions.updateUser, (state, { update }) => {
    return adapter.updateOne(update, state);
  })
);
