import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [TaskList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

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