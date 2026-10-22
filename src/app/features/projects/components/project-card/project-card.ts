import { Component, computed, input, output } from '@angular/core';
import {
  CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, PercentPipe, SlicePipe, UpperCasePipe,
} from '@angular/common';
import { Project } from '../../models/project.model';
import { TaskPriority } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList,
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  selected = input(false);   // vrai si cette carte est le projet sélectionné
  projectSelected = output<Project>();

  // Q4 — taux de réalisation entre 0 et 1 (le pipe percent multiplie par 100)
  completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;               // protection division par zéro
    const done = tasks.filter(t => t.status === 'Terminé').length;
    return done / tasks.length;
  });

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

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  statusClass(): string {
    switch (this.project().status) {
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}