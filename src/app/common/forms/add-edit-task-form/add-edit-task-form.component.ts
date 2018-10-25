import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'; 

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrls: ['./add-edit-task-form.component.scss'],
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
export class AddEditTaskFormComponent implements OnInit {
  @Output() onSubmitDone = new EventEmitter<Task>();
  @Output() onFormClosing = new EventEmitter<void>();
  @ViewChild('time') timeRef: ElementRef;
  @Input() color : string;
  @Input() showCloseIcon: boolean;
  constructor() { }
  ngOnInit() {

  }
  closeForm(){
    this.onFormClosing.emit();
  }
  onSubmitHandler(name: HTMLInputElement, description: HTMLInputElement,
    startDate: HTMLInputElement, estimatedEndDate: HTMLInputElement, 
    estimatedEndHour: HTMLInputElement, e){
    e.preventDefault();
    const newTask = new Task(name.value, description.value, new Date(), startDate.value, estimatedEndDate.value, 
      this.timeRef.nativeElement.value, estimatedEndHour.value);
    this.onSubmitDone.emit(newTask);
  }

}
