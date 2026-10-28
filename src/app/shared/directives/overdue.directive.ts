import { Directive, HostBinding, input } from '@angular/core';

/**
 * Signale une tâche en retard : non terminée ET échéance dépassée.
 * Usage : <li appOverdue [dueDate]="task.dueDate" [done]="task.status === 'Terminé'">
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

    // 'YYYY-MM-DD' → date locale à minuit (même logique que DeadlinePipe)
    const [year, month, day] = value.split('-').map(Number);
    const due = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due < today;                           // strictement avant aujourd'hui = dépassée
  }
}
