import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PROJECTS } from './features/projects/data/projects.data';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { ViewToggle, ViewMode } from './shared/components/view-toggle/view-toggle';
import { UserList } from './features/users/components/user-list/user-list';

console.log(PROJECTS);
@Component({
  imports: [RouterOutlet, ProjectList, ViewToggle, UserList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  view = signal<ViewMode>('task');
}