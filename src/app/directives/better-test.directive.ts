import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input,
  TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appBetterTest]'
})
export class BetterTestDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'color';
  //[defaultColor]="'red'"

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private templateRef: TemplateRef<any>, 
    private vcRef: ViewContainerRef) { }
  ngOnInit(){
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }
  @HostListener('mouseenter') mouseOver(eventData: Event){
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event){
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    this.backgroundColor = 'blue';
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  @Input() set unless(condition: boolean){
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.vcRef.clear();
    }
  }
}

/*
<div ngSwitch="value">

  <div *ngSwitchCase="10"></div>
  <div *ngSwitchDefault><
</div>
*/