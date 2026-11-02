const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Nombre de jours entre aujourd'hui et une date 'YYYY-MM-DD'.
 * 0 = aujourd'hui, 1 = demain, -3 = il y a 3 jours.
 * Utilisé par DeadlinePipe, OverdueDirective et TaskItem.
 */
export function daysUntil(isoDate: string): number {
  // 'YYYY-MM-DD' → date locale à minuit (évite le décalage UTC de new Date('YYYY-MM-DD'))
  const [year, month, day] = isoDate.split('-').map(Number);
  const due = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);                    // on compare des jours, pas des heures

  // Math.round absorbe le décalage d'1 h lors des changements d'heure été/hiver
  return Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);
}
