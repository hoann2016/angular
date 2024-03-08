interface AppState {
   counter: { value: { value: number } };
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { increment, init } from './store/increment.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  counter = -1;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(init())
    this.store
      .select((state) => state.counter)
      .subscribe((state: { value: { value: number } }) => {
        this.counter = state.value.value;
      });
  }
  Increment() {
    //this.counter++;
    this.store.dispatch(increment({ value: this.counter }));
  }
}
