import { Component, input } from '@angular/core';
import { Task } from '../../../projects/models/task.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css',
})
export class UserProjectGroup {
  projectName = input.required<string>();
  tasks = input.required<Task[]>();
}