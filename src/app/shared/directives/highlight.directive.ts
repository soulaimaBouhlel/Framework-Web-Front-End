import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

/**
 * Change la couleur de fond de l'élément au survol, puis restaure la couleur d'origine.
 * Usage : <div appHighlight>              → jaune clair #fef9c3 par défaut
 *         <div appHighlight="#e0f2fe">    → couleur de survol personnalisée
 */
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  // La valeur de l'attribut appHighlight ; vide quand on écrit simplement « appHighlight »
  appHighlight = input<string>('');

  private originalColor = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // On mémorise le style inline existant (souvent vide : le fond vient alors des classes Tailwind)
    this.originalColor = this.el.nativeElement.style.backgroundColor;
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.appHighlight() || '#fef9c3');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.originalColor) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalColor);
    } else {
      // Pas de style inline à l'origine → on le retire, et la couleur des classes revient
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
