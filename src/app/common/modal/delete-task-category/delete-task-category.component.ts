import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-task-category',
  templateUrl: './delete-task-category.component.html',
  styleUrls: ['./delete-task-category.component.scss']
})
export class DeleteTaskCategoryComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();
  @Output() categoryDeleted = new EventEmitter<void>();
  closeModal(){
    this.modalClosed.emit();
  }
  deleteCategory(){
    this.categoryDeleted.emit();
  }
  constructor() { }

  ngOnInit() {
  }

}
