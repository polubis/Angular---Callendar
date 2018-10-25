import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsService } from '../../../services/forms.service';
import { OperationsService } from '../../../services/operationsService';


@Component({
  selector: 'app-add-callendar-form',
  templateUrl: './add-callendar-form.component.html',
  styleUrls: ['./add-callendar-form.component.scss'],
  providers: [FormsService]
})
export class AddCallendarFormComponent implements OnInit {
  items: {value: string, results: boolean[], isInputCorrect: boolean}[];
  currentTouchedFormItem: number = -1;
  isFormDirty: boolean = false;
  shouldShowDirtyForMessage: boolean = false;
  @Input() givenSettings;
  @Input() keysWhichWIllCreateASubmitObject: string[];
  @Input() currentEditIndex: number;
  @Input() editValues: string[];
  @Output() onSubmitting: EventEmitter<any> = new EventEmitter();
  
  constructor(private formsService: FormsService, private operationsService: OperationsService) { 
  }

  ngOnInit() {
     this.items = this.formsService.createItems(this.givenSettings, this.editValues, this.currentEditIndex);
  }
  focusInput(index: number){
    if(this.shouldShowDirtyForMessage)
      this.shouldShowDirtyForMessage = false;

    this.currentTouchedFormItem = index;
  }
  blurInput(){
    this.currentTouchedFormItem = -1;
  }
  onChangeForm(index: number, e){
      const validationResult: boolean[] = this.formsService.validate(this.givenSettings[index].validationRules, e.target.value);
      this.currentTouchedFormItem = index;
      this.items[index].value = e.target.value;
      this.items[index].results = validationResult;
      this.items[index].isInputCorrect = this.formsService.checkIsInputCorrect(validationResult);

      if(this.isFormDirty){
        this.isFormDirty = this.formsService.checkIsFormDirty(this.items);
      }
  }

  onSubmitHandler(){
    const result : {isFormDirty: boolean, inputResults: {value: string, results: boolean[], isInputCorrect: boolean}[]} =
      this.formsService.validateOnSubmit(this.givenSettings, this.items);
    if(result.isFormDirty){
      this.shouldShowDirtyForMessage = true;
      this.isFormDirty = result.isFormDirty;
      this.items = result.inputResults;
    }
    else{
      this.onSubmitting.emit(this.operationsService.transformIntoObject(this.keysWhichWIllCreateASubmitObject, 
        this.items));
    }
  }

}
