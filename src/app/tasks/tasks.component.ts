import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { OperationsService } from '../services/operationsService';
import { Task } from '../models/task.model';
import { Day } from '../models/day.model';
import { CallendarsService } from '../services/callendars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TasksService, private operationsService: OperationsService, 
    private callendarsService: CallendarsService, private route: ActivatedRoute) { }
  tasksTypes: {name: string, icon: string, color: string, tasks: Task[]}[] = [];
  days: Day[] = [];
  ngOnInit(){
    this.tasksTypes = this.taskService.tasksTypes;
    const callendarIdInUrl = this.route.snapshot.params['id'];
    const callendar = this.callendarsService.returnCallendars()[callendarIdInUrl];

    this.days = this.operationsService.createDays(callendar.startDate, callendar.expiringDate);
  }
  addType(name: string, icon: string, color: string){
    this.taskService.addType(name, icon, "#6ac72f");
  }
  changeIcon(index, icon){
    this.taskService.changeIcon(index, icon);
  }
  changeColor(color, index){
    this.taskService.changeColor(index, color);
  }
  removeTask(taskTypeIndex, taskIndex){
    this.taskService.removeTask(taskTypeIndex, taskIndex);
  }
  deleteCategory(index){
    this.taskService.deleteCategory(index);
  }

  addNewTask(taskTypeIndex, task: Task){
    this.taskService.addNewTask(taskTypeIndex, task);
  }

  moveItemInRight(taskTypeIndex, taskIndex){
    this.taskService.moveItemInRight(taskTypeIndex, taskIndex);
  }
  moveItemInLeft(taskTypeIndex, taskIndex){
    this.taskService.moveItemInLeft(taskTypeIndex, taskIndex);
  }
  editTask(response: Object, taskTypeIndex){
    this.taskService.editTask(response['task'], taskTypeIndex, response['currentEditTaskId']);
  }
}
