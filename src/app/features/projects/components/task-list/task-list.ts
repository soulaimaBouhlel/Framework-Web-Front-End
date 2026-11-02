import { Component, input, output } from '@angular/core';
import { Task, TaskStatus, TaskStatusChange } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input(true);      // Partie 2.4
  editable = input(true);          // false dans la vue « Par user »
  users = input<User[]>([]);       // Partie 5 : utilisateurs déjà récupérés par ProjectList

  // Partie 3.4 — on remonte l'identifiant de la tâche et son nouveau statut
  taskStatusChange = output<TaskStatusChange>();
  // Bonus 1 — on remonte l'identifiant de la tâche à supprimer
  taskDelete = output<number>();

  // Partie 5.4 — nom de l'utilisateur assigné, undefined si non assignée ou introuvable
  assigneeName(id?: number): string | undefined {
    if (id === undefined) return undefined;
    return this.users().find(u => u.id === id)?.name;
  }

  onTaskStatusChange(taskId: number, status: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, status });
  }
}
