import { Action, createReducer, on } from '@ngrx/store';
import { increment, init, set } from './increment.action';
import { state } from '@angular/animations';
export interface State {
  value:{value: number;}
}
export const initialState: State = {
  value: { value: 0 },
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ value: { value: state.value.value + 1 } })),
  on(set, (state, action) => ({ value: { value: action.value } }))
);
