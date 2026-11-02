import { Directive, HostBinding, input } from '@angular/core';
import { daysUntil } from '../utils/date.utils';

/**
 * Signale une tâche en retard : non terminée ET échéance dépassée.
 * Usage : <div appOverdue [dueDate]="task.dueDate" [done]="task.status === 'Terminé'">
 */
@Directive({ selector: '[appOverdue]' })
export class OverdueDirective {
  dueDate = input<string | undefined>();   // optionnelle : tâche 9 n'en a pas
  done = input(false);

  @HostBinding('class')
  get overdueClasses(): string {
    return this.isOverdue() ? 'border-red-500 bg-red-50' : '';
  }

  private isOverdue(): boolean {
    const value = this.dueDate();
    if (!value || this.done()) return false;      // date absente ou tâche terminée → rien
    return daysUntil(value) < 0;                  // strictement avant aujourd'hui = dépassée
  }
}
