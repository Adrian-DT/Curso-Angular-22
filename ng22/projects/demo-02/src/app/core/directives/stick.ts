import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[indStick]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Stick {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly color = input('', { alias: 'indStick' });

  constructor() {
    console.log('Constructor', this.el)
  }

  // @HostListener("mouseenter")
  onMouseEnter() {
    // Usando rendered
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.color() || 'yellow');
    // Manipulando directamente el DOM
    // this.el.nativeElement.style.backgroundColor = this.color();
  }

  // @HostListener("mouseleave")
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
