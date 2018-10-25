import { Directive, Renderer2, OnInit, ElementRef, HostListener, Input } from '@angular/core';
  
  @Directive({
    selector: '[iconHoverDirective]'
  })
  export class IconHoverDirective implements OnInit {
    defaultColor: string = 'transparent';
    @Input('iconHoverDirective') incomingColor: string = '';
    
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    ngOnInit(){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor);
    }
    @HostListener('mouseenter') mouseOver(eventData: Event){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.incomingColor);
    }
  
    @HostListener('mouseleave') mouseLeave(eventData: Event){
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor);
    }
  }
  