import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/increment.reducer';
import { provideEffects } from '@ngrx/effects';
import { IncrementEffects } from './store/increment.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ counter: counterReducer }), provideEffects(IncrementEffects)]
};
