import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { IconSelectorComponent } from './common/icon-selector/icon-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BetterTestDirective } from './directives/better-test.directive';
import { ColorSelectorComponent } from './common/color-selector/color-selector.component';
import { ApiService } from './services/api.service';
import { IconHoverDirective } from './directives/icon-hover-directive';
import { ModalComponent } from './common/modal/modal.component';
import { BackdropComponent } from './common/backdrop/backdrop.component';
import { DeleteTaskCategoryComponent } from './common/modal/delete-task-category/delete-task-category.component';
import { MomentModule } from 'angular2-moment';
import { DragDropDirectiveModule} from "angular4-drag-drop";

import { AddEditTaskFormComponent } from './common/forms/add-edit-task-form/add-edit-task-form.component';
import { CallendarComponent } from './callendar/callendar.component';
import { CallendarsService } from './services/callendars.service';
import { OperationsService } from './services/operationsService';
import { FormsModule } from '@angular/forms';
import { AddCallendarFormComponent } from './common/forms/add-callendar-form/add-callendar-form.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TasksComponent,
    TaskComponent,
    IconSelectorComponent,
    IconHoverDirective,
    BetterTestDirective,
    ColorSelectorComponent,
    ModalComponent,
    BackdropComponent,
    DeleteTaskCategoryComponent,
    AddEditTaskFormComponent,
    CallendarComponent,
    AddCallendarFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MomentModule,
    DragDropDirectiveModule,
    FormsModule
  ],
  providers: [ApiService, CallendarsService, OperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
