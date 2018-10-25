import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.scss"]
})
export class BackdropComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();

  ngOnInit() {
  }
  closeModal() {
    this.modalClosed.emit();
  }
}
