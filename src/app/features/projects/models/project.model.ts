import { Task } from './task.model';

export type ProjectStatus = 'En attente' | 'En cours' | 'Terminé';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;     // TP3 : format 'YYYY-MM-DD'
  budget: number;        // TP3 : budget en dinars tunisiens (TND)
  tasks: Task[];
}