import { Component, computed, input, output } from '@angular/core';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { daysUntil } from '../../../../shared/utils/date.utils';

// Partie 3.3 — cycle des statuts : En attente → En cours → Terminé → En attente
const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  'En attente': 'En cours',
  'En cours': 'Terminé',
  'Terminé': 'En attente',
};

@Component({
  selector: 'app-task-item',
  imports: [
    DatePipe, NgClass, NgStyle,
    TruncatePipe, DeadlinePipe, InitialsPipe,
    HighlightDirective, OverdueDirective, TooltipDirective,
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Partie 1.2 — entrée obligatoire
  task = input.required<Task>();

  // Partie 2.4 / 2.5 — reçus de TaskList
  showAssignee = input(true);
  assigneeName = input<string | undefined>();   // déjà résolu par le parent (Partie 5.2)
  canChangeStatus = input(true);                // false dans la vue « Par user » (lecture seule)

  // Partie 3.2 — événement vers le parent : le nouveau statut
  taskStatusChange = output<TaskStatus>();

  isDone = computed(() => this.task().status === 'Terminé');
  nextStatus = computed(() => NEXT_STATUS[this.task().status]);

  // Partie 1.7 / 6.2 — classes selon le statut (ngClass)
  statusClasses = computed(() => {
    const status = this.task().status;
    return {
      'border-green-500 bg-green-50': status === 'Terminé',
      'border-blue-500 bg-blue-50': status === 'En cours',
      'border-gray-400 bg-gray-50': status === 'En attente',
    };
  });

  // Partie 1.7 — classes selon la priorité (ngClass sur le titre)
  titleClasses = computed(() => {
    const priority = this.task().priority;
    return {
      'font-bold': priority === 'Haute',
      'font-semibold': priority === 'Moyenne',
      'font-medium': priority === 'Basse',
      'line-through text-gray-500': this.isDone(),
    };
  });

  // Partie 6.3 — indicateur visuel de l'échéance (ngStyle) : couleur de la pastille
  deadlineColor = computed(() => {
    const due = this.task().dueDate;
    if (!due || this.isDone()) return '#9ca3af';   // gris : pas d'échéance ou tâche terminée
    const days = daysUntil(due);
    if (days < 0) return '#ef4444';                 // rouge : en retard
    if (days <= 3) return '#f59e0b';                // orange : bientôt
    return '#22c55e';                               // vert : on a le temps
  });

  // Partie 3.2 — on n'émet que le nouveau statut ; on ne modifie PAS this.task()
  changeStatus(): void {
    this.taskStatusChange.emit(this.nextStatus());
  }
}
