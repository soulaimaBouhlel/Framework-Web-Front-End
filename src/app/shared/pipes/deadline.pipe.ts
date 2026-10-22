import { Pipe, PipeTransform } from '@angular/core';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Texte relatif à aujourd'hui pour une date d'échéance 'YYYY-MM-DD'.
 * « Pas d'échéance », « Aujourd'hui », « Demain », « Dans n jours »,
 * « En retard de n jour(s) »
 */
@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return 'Pas d\'échéance';

        // 'YYYY-MM-DD' → date locale à minuit (évite le décalage UTC de new Date('YYYY-MM-DD'))
        const [year, month, day] = value.split('-').map(Number);
        const due = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);                  // on compare des jours, pas des heures

        // Math.round absorbe le décalage d'1 h lors des changements d'heure été/hiver
        const diff = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

        if (diff === 0) return 'Aujourd\'hui';
        if (diff === 1) return 'Demain';
        if (diff > 1) return `Dans ${diff} jours`;

        const late = -diff;
        return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
    }
}