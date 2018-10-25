import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'test'
})
export class Test implements OnInit {
    constructor(private elementRef: ElementRef){
    }
    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}