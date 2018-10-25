import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['../icon-selector/icon-selector.component.scss'],
  providers: [ColorsService]
})
export class ColorSelectorComponent implements OnInit {
  colorsArray: Array<string> = [];
  constructor(private colorsService: ColorsService) { }
  @Output() colorChanged = new EventEmitter<string>();

  ngOnInit() {
    this.colorsArray = this.colorsService.colorsArray;
  }
  changeColor(color){
    this.colorChanged.emit(color);
  }
 
}
