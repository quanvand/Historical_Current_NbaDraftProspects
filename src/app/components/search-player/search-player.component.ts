// search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    Player: <input
      class="search-input"
      type="text"
      placeholder="Search by name"
      (input)="onSearch($event)"
    />
  `,
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.emit(inputElement.value);
  }
}
