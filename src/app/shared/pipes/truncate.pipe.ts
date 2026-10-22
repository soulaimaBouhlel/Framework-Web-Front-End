import { Pipe, PipeTransform } from '@angular/core';

/**
 * Coupe un texte trop long.
 * Usage : {{ texte | truncate }}            → limite 50, suffixe « … »
 *         {{ texte | truncate: 40 }}        → limite 40
 *         {{ texte | truncate: 40 : '...' }}→ suffixe personnalisé
 */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string | null | undefined, limit = 50, suffix = '…'): string {
        if (!value) return '';                       // valeur absente → chaîne vide
        if (value.length <= limit) return value;     // texte court → inchangé
        return value.slice(0, limit).trimEnd() + suffix; // coupe, retire les espaces de fin, ajoute le suffixe
    }
}