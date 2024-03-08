import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, switchMap, tap } from 'rxjs';
import { increment, init, set } from './increment.action';
import { Store } from '@ngrx/store';

interface AppState {
   counter: number;
}

@Injectable()
export class IncrementEffects {
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment),
        switchMap((action) => this.store.select((state) => state.counter)),
        tap((state: any) => {
          console.log('Increment effect', state.value.value);
          localStorage.setItem('count', state.value.value.toString());
        })
      ),
    { dispatch: false }
  );
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const count = localStorage.getItem('count');
        return count ? of(set({ value: parseInt(count, 10) })) : EMPTY;
      })
    )
  );
  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
