import { Task } from '../models/task.model';


export class TasksService{
    tasks: Task[] = [
        new Task("Wynieść smieci", "Wynieść smiec poźniej i posprzątać",new Date(), "26/08/2018", "28/08/2018", "16:45", "16:45"),
        new Task("Wynieść smiecia", "Wynieść smiec poźniej i posprzątać",new Date(), "26/08/2018", "28/08/2018", "16:45", "16:45"),
        new Task("Wynieść smiecie", "Wynieść smiec poźniej i posprzątać",new Date(), "26/08/2018", "28/08/2018", "16:45", "16:45")        
    ];
    tasksTypes: {name: string, icon: string, color: string, tasks: Task[]}[] = [
        {name: "Zaplanowane", icon: "access_time", color: "#bf0a0a", tasks: [...this.tasks]},
        {name: "W trakcie", icon: "vertical_align_center",  color: "#fe6900",  tasks: [...this.tasks]},
        {name: "Zrealizowane", icon: "done_outline", color: "#6ac72f", tasks: [...this.tasks]}
    ];
    currentDraggedTaskInformations: {task: Task, draggedTaskTypeIndex: number, taskIndex: number} = null;

    prepareForDropping(task: Task, taskIndex: number, taskTypeIndex: number){
        const newCurrentDraggedInformations = { task: task, draggedTaskTypeIndex: taskTypeIndex, 
            taskIndex: taskIndex };
        this.currentDraggedTaskInformations = newCurrentDraggedInformations;
    }   

    dropTask(taskTypeIndex: number){
        if(taskTypeIndex !== this.currentDraggedTaskInformations.draggedTaskTypeIndex){
            this.tasksTypes[taskTypeIndex].tasks.unshift(this.currentDraggedTaskInformations.task);
            this.tasksTypes[this.currentDraggedTaskInformations.draggedTaskTypeIndex].
                tasks.splice(this.currentDraggedTaskInformations.taskIndex, 1);
        }
    }
    editTask(task: Task, taskTypeIndex, taskIndex){
        this.tasksTypes[taskTypeIndex].tasks[taskIndex] = task;
    }
    deleteCategory(index){
        this.tasksTypes.splice(index, 1);
    }
    addType(name: string, icon: string, color: string){
        this.tasksTypes.push({
          name: name, 
          icon: icon, 
          color: color,
          tasks: []
        });
    }
    changeColor(color, index){
        this.tasksTypes[index].color = color;
    }
    changeIcon(index, icon){
        this.tasksTypes[index].icon = icon;
    }
    removeTask(taskTypeIndex, taskIndex){
        let tasks = this.tasksTypes[taskTypeIndex].tasks;
        tasks.splice(taskIndex, 1);
        this.tasksTypes[taskTypeIndex].tasks = tasks;
    }

    addNewTask(taskTypeIndex, task: Task){
        let currentTasks = this.tasksTypes[taskTypeIndex].tasks;
        currentTasks.unshift(task);
        this.tasksTypes[taskTypeIndex].tasks = currentTasks;
    }

    moveItemInRight(taskTypeIndex, taskIndex){
        if(taskTypeIndex !== this.tasksTypes.length-1){
            const tasksByTaskTypIndex: Task[] = [...this.tasksTypes[taskTypeIndex].tasks];
            const clickedTask: Task = tasksByTaskTypIndex[taskIndex];

            tasksByTaskTypIndex.splice(taskIndex, 1);
            const newTasksCreatedInNextTaskType : Task[] = [...this.tasksTypes[taskTypeIndex+1].tasks];
            newTasksCreatedInNextTaskType.unshift(clickedTask);

            this.tasksTypes[taskTypeIndex].tasks = tasksByTaskTypIndex;
            this.tasksTypes[taskTypeIndex+1].tasks = newTasksCreatedInNextTaskType;
        }
    }

    moveItemInLeft(taskTypeIndex, taskIndex){
        if(taskTypeIndex !== 0){
            const tasksByTaskTypIndex: Task[] = [...this.tasksTypes[taskTypeIndex].tasks];
            const clickedTask: Task = tasksByTaskTypIndex[taskIndex];

            tasksByTaskTypIndex.splice(taskIndex, 1);
            
            const newTasksCreatedInNextTaskType : Task[] = [...this.tasksTypes[taskTypeIndex-1].tasks];

            newTasksCreatedInNextTaskType.unshift(clickedTask);
            
            this.tasksTypes[taskTypeIndex].tasks = tasksByTaskTypIndex;
            this.tasksTypes[taskTypeIndex-1].tasks = newTasksCreatedInNextTaskType;
            
        }
    }

 
    constructor(){
        
    }
}