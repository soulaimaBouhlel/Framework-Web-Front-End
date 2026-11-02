import { Component, computed, input, output } from '@angular/core';
import {
  CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgStyle, PercentPipe, SlicePipe, UpperCasePipe,
} from '@angular/common';
import { Project } from '../../models/project.model';
import {
  ProjectTaskRef, ProjectTaskStatusChange, TaskFilter, TaskPriority, TaskStatusChange,
} from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList,
    NgStyle,
    HighlightDirective,
    TaskStatusBadge,
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  selected = input(false);   // vrai si cette carte est le projet sélectionné
  users = input<User[]>([]);   // TP4 Partie 5 : transmis tel quel à TaskList
  projectSelected = output<Project>();

  // TP4 Partie 3.5 — on relaie l'événement en ajoutant projectId (Partie 3.7)
  taskStatusChange = output<ProjectTaskStatusChange>();
  // Bonus 1 — relaie la suppression en ajoutant projectId
  taskDelete = output<ProjectTaskRef>();

  // Bonus 2 — filtre choisi dans ProjectList
  statusFilter = input<TaskFilter>('Toutes');

  // Bonus 2 — tâches affichées : le filtre ne change QUE l'affichage ;
  // compteurs, pourcentage et barre restent calculés sur toutes les tâches
  visibleTasks = computed(() => {
    const filter = this.statusFilter();
    const tasks = this.project().tasks;
    return filter === 'Toutes' ? tasks : tasks.filter(t => t.status === filter);
  });

  // TP4 Partie 4.3 — nombre de tâches terminées
  doneCount = computed(() => this.project().tasks.filter(t => t.status === 'Terminé').length);

  // Q4 (TP3) / TP4 Partie 4.4 — taux de réalisation entre 0 et 1, calculé à partir de doneCount
  completionRate = computed(() => {
    const total = this.project().tasks.length;
    if (total === 0) return 0;                      // protection division par zéro
    return this.doneCount() / total;
  });

  // ngStyle Q2 — couleur de la barre de progression selon le taux de réalisation
  get barColor(): string {
    const percent = this.completionRate() * 100;
    if (percent < 34) return '#ef4444';   // rouge
    if (percent <= 66) return '#f59e0b';  // orange
    return '#22c55e';                     // vert
  }

  // Q5 — coût moyen par tâche (l'arrondi est fait par le pipe number)
  averageCost = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;               // protection division par zéro
    return this.project().budget / tasks.length;
  });

  // Q7 — nombre de tâches par priorité, affiché avec keyvalue
  priorityCounts = computed(() => {
    const counts: Record<TaskPriority, number> = { Haute: 0, Moyenne: 0, Basse: 0 };
    for (const task of this.project().tasks) {
      counts[task.priority]++;
    }
    return counts;
  });

  // On ne modifie pas this.project() (entrée) : on se contente de remonter l'information
  onTaskStatusChange(change: TaskStatusChange): void {
    this.taskStatusChange.emit({ projectId: this.project().id, ...change });
  }

  onTaskDelete(taskId: number): void {
    this.taskDelete.emit({ projectId: this.project().id, taskId });
  }

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
