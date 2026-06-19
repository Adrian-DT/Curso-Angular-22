import { Component, signal } from '@angular/core';

const INFO_ITEMS = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    {
      title: 'Prompt and best practices for AI',
      link: 'https://angular.dev/ai/develop-with-ai',
    },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

@Component({
  selector: 'ind-pills',
  imports: [],
  template: `
    <div class="pill-group">
      @for (item of items(); track item.title) {
        <a class="pill" [href]="item.link" target="_blank" rel="noopener">
          <span>{{ item.title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            viewBox="0 -960 960 960"
            width="14"
            fill="currentColor"
          >
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
            />
          </svg>
        </a>
      }
    </div>
  `,
  styles: `
    :host {
      --pill-accent-light: var(--bright-blue);
      --pill-accent-dark: var(--gray-100);
      --bg-color-light: color-mix(in srgb, var(--pill-accent-light) 5%, transparent);
      --bg-color-dark: color-mix(in srgb, var(--pill-accent-dark) 70%, transparent);
      --bg-color: light-dark(var(--bg-color-light), var(--bg-color-dark));

      --pill-hover-light: color-mix(in srgb, var(--pill-accent-light) 15%, transparent);
      --pill-hover-dark: color-mix(in srgb, var(--pill-accent-dark) 100%, transparent);
      --pill-hover: light-dark(var(--pill-hover-light), var(--pill-hover-dark));
    }

    .pill-group {
      display: flex;
      flex-direction: column;
      align-items: start;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .pill {
      display: flex;
      align-items: center;

      background: var(--bg-color);
      color: var(--pill-accent);
      padding-inline: 0.75rem;
      padding-block: 0.375rem;
      border-radius: 2.75rem;
      border: 0;
      transition: background 0.3s ease;
      font-family: var(--inter-font);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.4rem;
      letter-spacing: -0.00875rem;
      text-decoration: none;
      white-space: nowrap;
    }

    .pill:hover {
      background: var(--pill-hover);
    }

    .pill-group .pill:nth-child(6n + 1) {
      --pill-accent: var(--bright-blue);
    }
    .pill-group .pill:nth-child(6n + 2) {
      --pill-accent: var(--electric-violet);
    }
    .pill-group .pill:nth-child(6n + 3) {
      --pill-accent: var(--french-violet);
    }

    .pill-group .pill:nth-child(6n + 4),
    .pill-group .pill:nth-child(6n + 5),
    .pill-group .pill:nth-child(6n + 6) {
      --pill-accent: var(--hot-red);
    }

    .pill-group svg {
      margin-inline-start: 0.25rem;
    }
  `,
})
export class Pills {
  readonly items = signal(INFO_ITEMS);
}
