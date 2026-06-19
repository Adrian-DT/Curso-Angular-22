import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[indValidRole]',
})
export class ValidRoleDirective {
  private _templateRef = inject(TemplateRef);
  private _viewContainerRef = inject(ViewContainerRef);
  private _isValid = false;

  indValidRole = input<boolean>();

  constructor() {
    effect(() => {
      if (this.indValidRole() && !this._isValid) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._isValid = true;
      } else {
        this._viewContainerRef.clear();
        this._isValid = false;
      }
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['indValidRole'] && !this._isValid) {
  //     this._viewContainerRef.createEmbeddedView(this._templateRef);
  //     this._isValid = true;
  //   } else {
  //     this._viewContainerRef.clear();
  //     this._isValid = false;
  //   }
  // }

  // @Input() set indValidRole(isValid: boolean) {
  //   if (isValid && !this._isValid) {
  //     this._viewContainerRef.createEmbeddedView(this._templateRef);
  //     this._isValid = true;
  //   } else if (!isValid && this._isValid) {
  //     this._viewContainerRef.clear();
  //     this._isValid = false;
  //   }
}
