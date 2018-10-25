import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  messages: {} = {
    "deleteCategory" : {
      content: `Ta operacja jest nie odwracalna. Spowoduje usunięcie wszystkich dotychczas utworzonych zadań oraz
      zapisanych ustawień`
    },
    "addCallendar" : {
      content: `W tym oknie możesz dodać nowy kalendarz. Wypełnij poniższy formularz. Zwracaj uwagę na znak "*", który
      oznacza, że dane pole jest wymagane`
    },
    "editCallendar": {
      content: `W tym oknie możesz dokonać edycji kalendarza. Wypełnij wszystkie pola oznaczone znakiem "*", a następnie
        potwierdź wprowadzone zmiany`
    }
  }

  @Output() modalClosed = new EventEmitter<void>();
  @Output() categoryDeleted = new EventEmitter<void>();
  @Input() width: string;
  @Input() height: string;
  @Input() headerBackground: string;
  @Input() headerIcon: string;
  @Input() headerTitle: string;
  @Input() messageKey: string;
  constructor() {
  }

  ngOnInit() {
  }
  deleteCategory(){
    this.categoryDeleted.emit();
  }
  closeModal(){
    this.modalClosed.emit();
  }
}
