import { Component, signal } from '@angular/core';
import { TasksList } from "./components/tasks-list/tasks-list";

@Component({
  selector: 'ind-tasks-page',
  imports: [TasksList],
  template: `

  <section>
    <h2>{{ pageTitle() }}</h2>
    <ind-tasks-list/>
  </section>



  `,
  styleUrls: ['../pages.css'],
  styles: `
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  `,
})
export default class TasksPage {
  protected readonly pageTitle = signal('Tasks');


}
