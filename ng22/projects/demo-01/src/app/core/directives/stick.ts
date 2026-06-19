import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';


// Una directiva es útil cuando quieres realizar un comportamiento en varios componentes, sin tener que repetir el código en cada uno de ellos.
// Por ejemplo, si quieres que todos los elementos de un componente tengan un fondo amarillo cuando el ratón pase por encima de ellos, puedes crear una directiva que haga eso,
// y aplicarla a todos los elementos que quieras. De esta forma, si quieres cambiar el comportamiento, solo tienes que cambiar la directiva, y no todos los componentes.
@Directive({
  selector: '[indStick]',
  // El host es un objeto que define los eventos que queremos escuchar en el elemento al que se aplica la directiva.
  // En este caso, queremos escuchar los eventos mouseenter y mouseleave, y ejecutar los métodos onMouseEnter y onMouseLeave respectivamente.
  host: {
    '(mouseleave)': 'onMouseLeave()',
    '(mouseenter)': 'onMouseEnter()'
  }
})
export class Stick {
  // Inyectamos el ElementRef y el Renderer2, para poder manipular el DOM de forma segura,
  // sin tener que acceder directamente al DOM, lo cual no es recomendable, ya que no es compatible con el renderizado en servidor (SSR)
  // y no es compatible con Angular Universal.
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  // Creamos un input para poder pasarle un color desde el componente que utiliza la directiva con un alias, en este caso indStick.
  readonly color = input('',
    {
      alias: 'indStick',
    }
  );


  // No necesitamos el decorador @HostListener, porque ya lo hemos definido en el host de la directiva. Pero si queremos, podemos utilizarlo, y sería lo mismo.
  // @HostListener("mouseenter")
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, "backgroundColor", this.color() || "yellow");
    // También es posible cambiar el estilo directamente, manipulando directamente el DOM, pero no es recomendable, ya que no es compatible con el renderizado en servidor (SSR) y no es compatible con Angular Universal.
    // this.el.nativeElement.style.backgroundColor = "yellow";
  }

  // @HostListener("mouseleave")
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, "backgroundColor");
  }

  constructor() {
    console.log('Directiva', this.el);
  }

}
