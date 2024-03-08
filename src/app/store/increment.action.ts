import { createAction, props } from '@ngrx/store';

export const increment = createAction('Increment', props<{ value: number }>());
export const set = createAction('set', props<{ value: number }>());
export const init = createAction('Init');
