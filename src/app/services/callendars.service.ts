import { Callendar } from '../models/callendar.model';
import { EventEmitter, Injectable } from '@angular/core';
import { OperationsService } from './operationsService';
@Injectable()
export class CallendarsService{
    private Callendars: Callendar[] = [];

    callendarsChanged = new EventEmitter<Callendar[]>();
    
    constructor(private operationsService: OperationsService){
        this.Callendars = this.fetchCallendarsOnStart();
    }

    createCollapsedCallendars(){
        const collapsedCallendars: boolean[] = [];
        for(let key in this.Callendars){
            collapsedCallendars.push(true);
        }
        return collapsedCallendars;
    }

    private fetchCallendarsOnStart(){
        const Callendars: Callendar[] = [
            new Callendar("nowy kalendarz", "nowy kalendarz", '2018-12-18', '2018-15-18', 
            "08:35", "aktywny", 7, 3 ,4)
        ]
        return Callendars;
    }
    returnCallendars(){
        return this.Callendars;
    }
    createNewCallendar(data){
        const differenceBeetwenDates = this.operationsService.
            calculateDateDifference(data.expiringDate, data.startDate , 'days') + 1;
        const newCallendar: Callendar = new Callendar(data.name, data.description, data.startDate, data.expiringDate, data.workTime, 
           "aktywny", differenceBeetwenDates, 4, 3);
        
        this.Callendars.unshift(newCallendar);
        this.callendarsChanged.emit(this.Callendars);
    }
    deleteCallendar(callendarIndex: number){
        this.Callendars.splice(callendarIndex, 1);
        this.callendarsChanged.emit(this.Callendars);
        
    }
    editCallendar(callendarIndex: number, data){
        const oldCallendar = this.Callendars[callendarIndex];
        const newCallendar: Callendar = new Callendar(data.name, data.description, data.startDate, data.expiringDate, data.workTime, 
            oldCallendar.status, oldCallendar.numberOfWorkDays, oldCallendar.taskCategoryNumber, oldCallendar.tasksCountInCategory);

        this.Callendars[callendarIndex] = newCallendar;
        this.callendarsChanged.emit(this.Callendars);
    }
    changeStateOfCallendar(callendarIndex: number, status: string){
        this.Callendars[callendarIndex].status = status;
        this.callendarsChanged.emit(this.Callendars);
    }
}   