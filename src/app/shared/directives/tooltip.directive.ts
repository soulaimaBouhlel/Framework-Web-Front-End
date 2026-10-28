import { Directive, ElementRef, HostListener, inject, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

/**
 * Affiche une infobulle sous l'élément au survol.
 * Usage : <p [appTooltip]="task.description">…</p>   ou   appTooltip="Texte fixe"
 * La bulle est construite avec Renderer2 (createElement / appendChild / removeChild), sans innerHTML.
 */
@Directive({ selector: '[appTooltip]' })
export class TooltipDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  appTooltip = input<string | null | undefined>('');

  private bubble: HTMLElement | null = null;

  ngOnInit(): void {
    // La bulle est en position absolue : l'hôte doit servir de repère
    this.renderer.addClass(this.el.nativeElement, 'relative');
  }

  @HostListener('mouseenter')
  show(): void {
    const text = this.appTooltip();
    if (!text || this.bubble) return;             // rien à afficher, ou bulle déjà présente

    const span: HTMLElement = this.renderer.createElement('span');
    for (const cls of ['absolute', 'left-0', 'top-full', 'mt-1', 'z-10', 'w-64',
                       'rounded', 'bg-gray-800', 'px-2', 'py-1', 'text-xs', 'text-white', 'shadow']) {
      this.renderer.addClass(span, cls);
    }
    // Texte inséré comme nœud texte : aucun risque d'injection HTML
    this.renderer.appendChild(span, this.renderer.createText(text));
    this.renderer.appendChild(this.el.nativeElement, span);
    this.bubble = span;
  }

  @HostListener('mouseleave')
  hide(): void {
    if (!this.bubble) return;
    this.renderer.removeChild(this.el.nativeElement, this.bubble);
    this.bubble = null;
  }

  ngOnDestroy(): void {
    this.hide();                                  // nettoyage si l'élément disparaît pendant le survol
  }
}
