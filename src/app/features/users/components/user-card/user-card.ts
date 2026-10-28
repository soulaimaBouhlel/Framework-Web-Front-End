import { Component, computed, input } from '@angular/core';
import { LowerCasePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { User, UserRole } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState, NgClass, NgStyle, TitleCasePipe, LowerCasePipe, InitialsPipe],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  // ngStyle Q4 — correspondance rôle → couleur de la pastille d'initiales
  readonly roleColors: Record<UserRole, string> = {
    'Développeur': '#6366f1',    // indigo
    'Designer': '#ec4899',       // rose
    'Chef de projet': '#f59e0b', // orange
    'Testeur': '#14b8a6',        // turquoise
  };

  // tasks of this user, grouped by project (projects without tasks for this user are dropped)
  groups = computed(() =>
    this.projects()
      .map(p => ({
        projectId: p.id,
        projectName: p.name,
        tasks: p.tasks.filter(t => t.assigneeId === this.user().id),
      }))
      .filter(g => g.tasks.length > 0)
  );

  private assignedTasks = computed(() => this.groups().flatMap(g => g.tasks));

  todoCount = computed(() => this.assignedTasks().filter(t => t.status === 'En attente').length);
  inProgressCount = computed(() => this.assignedTasks().filter(t => t.status === 'En cours').length);
  doneCount = computed(() => this.assignedTasks().filter(t => t.status === 'Terminé').length);
}