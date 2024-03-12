import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { init, loadUsers } from "./user.action";
import { UserService } from "../user.service";
import * as UserActions from './user.action';


@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(init),
        mergeMap(() =>
          this.userService.getUsers().pipe(
            map((users) => UserActions.loadUsers({ users })),
            catchError((err) => {
              console.log('error', err);
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: true }
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
