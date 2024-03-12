import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { init, loadUsers, selectUser, updateUser } from './store/user.action';
import { User } from './user.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { pipe, tap } from 'rxjs';

interface UserState {
  users: AppState|null;
}
interface AppState {
  ids: number;
  entities: { [id: number]: User };
  selectedUserId: string|null;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  constructor(
    private store: Store<UserState>,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      id: '', // Initialize with an empty string
      name: '', // Initialize with an empty string
    });
  }
  ngOnInit(): void {
    this.store.dispatch(init());
    this.store
      .select((state) => state.users)
      .pipe(
        tap((s) => {
          this.users = [];
          if(s?.selectedUserId){
            const selectedId = parseInt(s?.selectedUserId || '0');
            this.userForm.setValue(s?.entities[selectedId] as User);
          }
        })
      )
      .subscribe((users) => {
        if (users?.entities) {
          Object.values(users.entities).forEach((s) => this.users.push(s));
        }
      });
  }
  selectUser(selectedUser: User) {
    this.store.dispatch(selectUser({ userId: selectedUser.id }));
  }
  onSubmit(): void {
    this.store.dispatch(updateUser({update: {id: this.userForm.value.id, changes: this.userForm.value as User}}));
  }
}
