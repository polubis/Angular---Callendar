import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss']
})
export class IconSelectorComponent {
  icons = ["build", "bookmarks", "cached", "donut_large", "favorite", "extension", "pets", "thumb_up", 
    "today", "update", "warning", "error", "call", "vpn_key", "create", "sort", "undo", "weekend",
    "highlight", "access_time", "vertical_align_center", "done_outline"];
  constructor() { }
  @Input() color: string;
  @Input() currentIcon: string;
  selectedIcon: string = "";
  @Output() iconAdded = new EventEmitter<string>();

  selectIcon(icon){
    this.iconAdded.emit(icon);
  }
}
