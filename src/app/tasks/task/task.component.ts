import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; 
import { TasksService } from '../../services/tasks.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('listAdd', [
      transition('void => *', [
        animate(250, keyframes([
          style({opacity: 0, transform: 'translateY(-15px)'}),
          style({opacity: 1, transform: 'translateX(0)'})
        ]))
      ])
    ])
  ]
})
  // enscapsulation: ViewEncapsulation.None -  powoduje, ze style zaczynajha byc globalne

export class TaskComponent implements OnInit {

  @Input('taskType') type: {name: string, icon: string, className: string, tasks: Task[]}
  @Input() taskCategoryIndex;
  @Input() taskTypesLength;
  constructor(private tasksService: TasksService) { 
  }
  isAddingTask: boolean = false;
  @ViewChild('time') timeRef: ElementRef;

  currentOperation: string = '';
  isEditing: boolean = false;
  wantDeleteCategory: boolean = false;
  expandedDetailsId = -1;
  currentEditTaskId = -1;
  
  @Output() onIconAdded = new EventEmitter<string>();
  @Output() onColorChanged = new EventEmitter<string>();
  @Output() onDeleteCaterogy = new EventEmitter<void>();
  @Output() onRemoveTask = new EventEmitter<Number>();
  @Output() onAddingNewTask = new EventEmitter<Task>();
  @Output() onMovingItemIntoRight = new EventEmitter<Number>();
  @Output() onMovingItemIntoLeft = new EventEmitter<Number>();
  @Output() onEditTask = new EventEmitter<Object>();
  ngOnInit(){
  }
  togleDeleteCategoryModal(){
    this.wantDeleteCategory = !this.wantDeleteCategory;
  }

  changeCurrentOperation(operationName){
    this.currentOperation = (operationName !== '' && this.currentOperation === operationName) ? '' : 
      operationName;
  }

  onAddIcon(icon){
    this.onIconAdded.emit(icon);
  }

  onChangeColor(color){
    this.onColorChanged.emit(color);
  }
  togleEditing() {
    this.isEditing = !this.isEditing;
    this.currentOperation = '';
  }

  togleAddingTask(){
    this.isAddingTask = !this.isAddingTask;
  }
  removeTask(taskIndex){
    this.expandedDetailsId = -1;
    this.onRemoveTask.emit(taskIndex);
  }

  deleteCategory(){
    this.onDeleteCaterogy.emit();
  }
  addNewTask(task: Task){
    this.onAddingNewTask.emit(task);
  }

  moveItemIntoRight(taskIndex){
    this.expandedDetailsId = -1;
    this.onMovingItemIntoRight.emit(taskIndex);
  }

  moveItemIntoLeft(taskIndex){
    this.expandedDetailsId = -1;
    this.onMovingItemIntoLeft.emit(taskIndex);
  }

  expandTaskDetails(taskId){
    this.expandedDetailsId = 
      this.expandedDetailsId === taskId ? -1 : taskId;
  }

  setCurrentEditTaskIt(taskId){
    this.currentEditTaskId = taskId;
  }
  editTask(task: Task){
    this.onEditTask.emit({task, currentEditTaskId: this.currentEditTaskId});
    this.currentEditTaskId = -1;
  }

  startDrag(task: Task, taskIndex: number){
    this.tasksService.prepareForDropping(task, taskIndex, this.taskCategoryIndex);
    
  }
  dropTask(eventData: Event){
    this.tasksService.dropTask(this.taskCategoryIndex);
  }
  
  /*
  onAddNewCategory(){
    this.categoryAdded.emit({
      name: "Nowa katerogia", icon: "add", className: "done"
    });
    // @Output('ctAdded') categoryAdded = new EventEmitter<{name: string, icon: string, className: string}>(
      (click)="onAddNewCategory()"
      (categoryAdded)="addType($event)"
  }
  <ng-content></ng-content> - robi to samo co this.props.children w Reacie

  @ContentChild('contentParagraph) ref: ElementRef - to samo ci ViewChild tylko przekazane z komponentu wyzej

  *ngIf="isEditing"
  *ngIf="wantDeleteCategory"
  */

}
