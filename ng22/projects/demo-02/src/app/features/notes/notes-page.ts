import { Component, signal } from '@angular/core';
import { NotesList } from "./components/notes-list/notes-list";

@Component({
  selector: 'ind-notes-page',
  imports: [NotesList],
  template: `
    <section class="page">
      <h2>{{ pageTitle() }}</h2>
      <ind-notes-list />
    </section>
  `,
  styleUrls: ['../pages.css'],
  styles: `
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export default class NotesPage {
  protected readonly pageTitle = signal('Notes');
}
