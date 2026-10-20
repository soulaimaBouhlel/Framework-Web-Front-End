import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-card',
  imports: [UserProjectGroup, EmptyState],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

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