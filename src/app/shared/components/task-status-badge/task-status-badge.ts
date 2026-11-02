import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

// Mêmes valeurs que TaskStatus et ProjectStatus : le badge sert aux deux,
// sans que shared/ dépende de features/
export type StatusValue = 'En attente' | 'En cours' | 'Terminé';

@Component({
  selector: 'app-task-status-badge',
  imports: [NgClass],
  templateUrl: './task-status-badge.html',
  styleUrl: './task-status-badge.css',
})
export class TaskStatusBadge {
  status = input.required<StatusValue>();
}
