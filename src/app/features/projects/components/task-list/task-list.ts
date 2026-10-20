import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private userService = inject(UserService);

  tasks = input.required<Task[]>();
  showAssignee = input(true);          // NEW: default true, UserProjectGroup passes false

  private users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find(u => u.id === id)?.name ?? 'Inconnu';
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Terminé': return 'border-green-500 bg-green-50';
      case 'En cours': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  }
}