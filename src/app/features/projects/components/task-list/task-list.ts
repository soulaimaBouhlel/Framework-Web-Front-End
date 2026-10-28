import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, NgClass, TruncatePipe, DeadlinePipe, HighlightDirective, OverdueDirective, TooltipDirective],
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
}