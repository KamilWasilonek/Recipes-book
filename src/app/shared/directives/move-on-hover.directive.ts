import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMoveOnHover]',
})
export class MoveOnHoverDirective implements OnInit {
  @Input() transitionInput = 'transform .5s';
  @Input() transformInput = 'translate(-10px, -10px)';
  @HostBinding('style.transition') transition;
  @HostBinding('style.transform') transform;
  originalPosition = 'translate(0, 0)';

  ngOnInit() {
    this.transition = this.transitionInput;
    this.transform = this.originalPosition;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.transform = this.transformInput;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.transform = this.originalPosition;
  }
}
