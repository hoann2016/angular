import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";
import { Update } from "@ngrx/entity";

export const init=createAction('Init');
export const loadUsers = createAction('Load User', props<{ users: User[] }>());
export const selectUser = createAction('Select User', props<{ userId: string }>());
export const updateUser = createAction('[User/API] Update User', props<{ update: Update<User> }>());
