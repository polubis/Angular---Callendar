import { Injectable } from '@angular/core';
import { OperationsService } from './operationsService';
import * as moment from 'moment';

const patterns = {
    name: /^[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i, 
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}


// Podaje tablice elementow do forma => forLabel name => (ref, id, name, ), value: "", error: "", validationRules: {}
@Injectable()
export class FormsService{ 
    methodStagger: {} = {
        minLength: (value: string, minLength: number) => this.haveNotEnoughChars(value, minLength),
        maxLength: (value: string, maxLength: number) => this.haveToManyChars(value, maxLength),
        workTime: (value: string, correctWorkTime: string) => this.isWorkTimeCorrect(value, correctWorkTime),
        isHigherThanToday : (value: string) => this.isStartDateEalierThanToday(value)
    }
    constructor(private operationsService: OperationsService){}
    
    validateOnSubmit(settings, items) : {isFormDirty: boolean, inputResults: {value: string, results: boolean[], isInputCorrect: boolean}[]}{
        const inputResults: {value: string, results: boolean[], isInputCorrect: boolean}[] = [];
        let isFormDirty: boolean = false;

        for(let i = 0; i < settings.length; i++){
            const validation: boolean[] = this.validate(settings[i].validationRules, items[i].value);
            const isInputCorrect: boolean = this.checkIsInputCorrect(validation);
            if(!isInputCorrect)
                isFormDirty = true;

            inputResults.push({value: items[i].value, results: validation, isInputCorrect: isInputCorrect});
        }
        return {isFormDirty: isFormDirty, inputResults: inputResults};
    }
    validate(settings: {}, value: string) : boolean[]{
        const keys: string[] = Object.keys(settings);
        const results: boolean[] = [];
        if(this.operationsService.contains(keys, "isRequired")){
            const result = this.isExist(value);
                results.push(result);
            for(let i = 0; i < keys.length; i++){
                if(keys[i] !== "isRequired"){
                    const result = this.methodStagger[keys[i]](value, settings[keys[i]]);
                    results.push(result);
                }
            }                
        }
        else if(value !== ""){
            for(let i = 0; i < keys.length; i++){
                const result = this.methodStagger[keys[i]](value, settings[keys[i]]);
                results.push(result);
            }  
        }
       
        return results;
    }
    checkIsFormDirty(items){
        for(let key in items){
            if(items[key].isInputCorrect === false)
                return true;
        }
        return false;
    }

    checkIsInputCorrect(results: boolean[]): boolean{
        for(let key in results){
            if(!results[key])
                return false;
        }
        return true;
    }
    private isWorkTimeCorrect(value: string, correctWorkTime: string){
        const hour = value.substring(0, 2);
        const minute = value.substring(3,5);
        const correctHour = correctWorkTime.substring(0, 2);
        const correctMinute = correctWorkTime.substring(3,5);

        const preferedDate = `2013-05-09T${correctHour}:${correctMinute}:00Z`;
        const valueDate = `2013-05-09T${hour}:${minute}:00Z`;

        let preferedMoment: moment.Moment = moment(preferedDate);
        let valueMoment: moment.Moment = moment(valueDate);

        return valueMoment.isBefore(preferedMoment) ? true : false;
    }
    private isExist(element: any) : boolean{
        return element ? true : false;
    }
    private haveNotEnoughChars(value: string, minLength: number) : boolean{
        return value.length < minLength ? false : true;
    }
    private haveToManyChars(value: string, maxLength: number) : boolean{
        return value.length > maxLength ? false : true;
    }
    private isStartDateEalierThanToday(value: string){
        const todayInMoment = moment();
        const valueInMoment = moment(value);

        return valueInMoment.isAfter(todayInMoment) ? true : false;
    }

 
    createItems(settings, editValues: string[], currentEditIndex: number) : {value: string, results: boolean[], isInputCorrect: boolean}[]{
        const items: {value: string, results: boolean[], isInputCorrect: boolean}[] = [];
        if(currentEditIndex !== -1){
            for(let i = 0; i < settings.length; i++){
                const results = this.validate(settings[i].validationRules, editValues[i]);
                items.push({value: editValues[i], results: results, isInputCorrect: this.checkIsInputCorrect(results)});
            }
        }
        else{
            for(let key in settings){
                items.push({value: "", 
                results: this.createResults(Object.keys(settings[key].validationRules).length), isInputCorrect: true});
            }
        }
        return items;
    }

    private createResults(formsItemsLength: number): boolean[]{
        const results: boolean[] = [];
        for(let i = 0; i < formsItemsLength; i++){
            results.push(false);
        }

        return results;
    }
}