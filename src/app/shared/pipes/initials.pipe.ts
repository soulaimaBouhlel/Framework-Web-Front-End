import { Pipe, PipeTransform } from '@angular/core';

/**
 * Initiales en majuscules des deux premiers mots d'un nom.
 * « Amira Ben Salah » → « AB », « karim » → « K », absent → « ? »
 */
@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        const words = (value ?? '').trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length === 0) return '?';          // valeur absente ou vide

        return words
            .slice(0, 2)                               // deux premiers mots seulement
            .map(word => word[0].toUpperCase())        // première lettre en majuscule
            .join('');
    }
}