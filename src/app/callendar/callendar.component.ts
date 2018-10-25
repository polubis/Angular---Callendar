import { Component, OnInit } from '@angular/core';
import { Callendar } from '../models/callendar.model';
import { CallendarsService } from '../services/callendars.service';
import { ComunicatesService } from '../services/comunicates.service';
import { callendarFormSettings } from '../constants/constants';
import { OperationsService } from '../services/operationsService';
import { MomentModule } from 'angular2-moment';


@Component({
  selector: 'app-callendar',
  templateUrl: './callendar.component.html',
  styleUrls: ['./callendar.component.scss']
})
export class CallendarComponent implements OnInit {
  Callendars: Callendar[] = [];
  collapsedCallendars: boolean[] = [];
  shouldStartAddingCalendar: boolean = false;
  callendarFormSettings: {} = callendarFormSettings;
  addCallendarKeysForForm: string[] = ["name", "description", "startDate", "expiringDate", "workTime"];

  currentEditCallendarIndex: number = -1;
  currentEditStartValues: string[] = [];

  currentExpandedMenuIndex: number = -1;

  constructor(private callendarsService: CallendarsService, private comunicatesService: ComunicatesService, private operationsService: OperationsService) { }
  
  ngOnInit() {
    this.Callendars = this.callendarsService.returnCallendars();
    this.callendarsService.callendarsChanged
      .subscribe((callendars: Callendar[]) => {
        this.Callendars = callendars;
      });
    this.collapsedCallendars = this.callendarsService.createCollapsedCallendars();
  }
  togleCallendar(name: string){
    const callendarIndex = this.Callendars.findIndex(callendar => callendar.name === name);
    this.collapsedCallendars[callendarIndex] = !this.collapsedCallendars[callendarIndex];
  }

  togleAddCallendarModal(index: number){
    this.shouldStartAddingCalendar = !this.shouldStartAddingCalendar;
    this.currentEditCallendarIndex = index;

    if(index !== undefined && index !== -1){
      this.currentEditStartValues = this.operationsService.takeSpecificValuesByKeysArray(this.Callendars[index], this.addCallendarKeysForForm);
    }
  }
  updateCallendars(submitFormData: {}){
    if(this.currentEditCallendarIndex === -1){
      this.callendarsService.createNewCallendar(submitFormData);
      this.comunicatesService.showComunicate("Pomyślnie utworzono kalendarz", true);
    }
    else{
      this.callendarsService.editCallendar(this.currentEditCallendarIndex, submitFormData);
      this.comunicatesService.showComunicate(`Pomyślnie dokonano edycji kalendarza ${this.Callendars[this.currentEditCallendarIndex].name}`, true);
    }

  }

  changeStateOfCallendar(index: number, status: string){
    this.callendarsService.changeStateOfCallendar(index, status);
  }

  expandLeftMenuIntoRight(index: number){
    this.currentExpandedMenuIndex = index === this.currentExpandedMenuIndex ? -1 : index;
  }
}
