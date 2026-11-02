import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectTaskStatusChange } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  // TP4 Partie 4.1 — l'état des projets vit ici, dans un Signal
  projects = signal<Project[]>([]);
  // TP4 Partie 5.3 / 5.4 — utilisateurs récupérés UNE fois, puis transmis aux enfants
  users = signal<User[]>([]);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);   // projet actuellement sélectionné

  // TP4 Partie 6.6 — les composants imbriqués ne reçoivent que les projets filtrés
  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    return this.projects().filter(p => p.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    // TP4 Partie 5.1 — même récupération RxJS qu'avant
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject.set(project);
  }

  // TP4 Parties 3.6, 4.1, 4.2 — mise à jour immuable avec update()
  onTaskStatusChange({ projectId, taskId, status }: ProjectTaskStatusChange): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== projectId
          ? project                                   // projets non concernés : même référence
          : {
              ...project,                             // nouveau projet…
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, status } : task   // …avec une nouvelle tâche
              ),
            }
      )
    );
  }
}
