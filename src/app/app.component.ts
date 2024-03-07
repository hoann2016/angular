import { Component, Signal, WritableSignal, computed, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import _, { isEqual } from 'lodash';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  count = signal(3);
  source: WritableSignal<number> = signal(1);
  computeValue: Signal<number> = computed(() => this.source() + 5);
  changeValue() {
    this.count.update((lv) => lv + 3);
  }
  testingIf = 1;
  title = 'my-app';
  constructor() {
    effect(() => {
      console.log(
        `The current count is: ${this.count()} and computed value ${this.computeValue()}`
      );
    });
    //Declare a signal

    console.log('The count is: ' + this.count());
    this.count.update((lv) => lv + 3);
    console.log('last value is ', this.count());
    //computed signal

    const data = signal(['test'], { equal: _.isEqual });
    data.set(['test']);
    console.log('eual', data());
  }

  clickMe() {
    console.log('click me');
  }
}
