import { Pipe, PipeTransform } from '@angular/core';
import { daysUntil } from '../utils/date.utils';

/**
 * Texte relatif à aujourd'hui pour une date d'échéance 'YYYY-MM-DD'.
 * « Pas d'échéance », « Aujourd'hui », « Demain », « Dans n jours »,
 * « En retard de n jour(s) »
 */
@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return 'Pas d\'échéance';

        const diff = daysUntil(value);

        if (diff === 0) return 'Aujourd\'hui';
        if (diff === 1) return 'Demain';
        if (diff > 1) return `Dans ${diff} jours`;

        const late = -diff;
        return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
    }
}
