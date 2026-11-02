export type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';
export type TaskStatus = 'En attente' | 'En cours' | 'Terminé';

export interface Task {
    id: number;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    assigneeId?: number;
    dueDate?: string;      // TP3 : format 'YYYY-MM-DD', optionnelle
    description?: string;  // TP3 : description détaillée, optionnelle
}

// TP4 — événement remonté par TaskList : quelle tâche, quel nouveau statut
export interface TaskStatusChange {
    taskId: number;
    status: TaskStatus;
}

// TP4 — même événement enrichi par ProjectCard avec l'identifiant du projet
export interface ProjectTaskStatusChange extends TaskStatusChange {
    projectId: number;
}

// Bonus TP4 — suppression : quelle tâche, dans quel projet
export interface ProjectTaskRef {
    projectId: number;
    taskId: number;
}

// Bonus TP4 — filtre d'affichage des tâches
export type TaskFilter = 'Toutes' | 'En cours' | 'Terminé';
