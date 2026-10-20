import { Component, input, output } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  imports: [],
  templateUrl: './view-toggle.html',
  styleUrl: './view-toggle.css',
})
export class ViewToggle {
  view = input.required<ViewMode>();
  viewChange = output<ViewMode>();
}