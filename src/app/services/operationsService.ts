import * as moment from 'moment';
import { Day } from '../models/day.model';

export class OperationsService{
    contains(array, element): boolean{
        for(let key in array){
            if(array[key] === element)
                return true;
        }
        return false;
    }

    transformIntoObject(specifiedKeys: string[], array: any[]): {}{
        const objectToRetrun = {};
        for(let i = 0; i < array.length; i++){
            objectToRetrun[specifiedKeys[i]] = array[i].value;
        }
        return objectToRetrun;
    }

    takeSpecificValuesByKeysArray(incomingObject: any, incomingArrayKeys: string[]){
        const objectKeys = Object.keys(incomingObject);
        const arrayOfValues: string[] = [];
        
        for(let i = 0; i < incomingArrayKeys.length; i++){
            if(incomingArrayKeys[i] === objectKeys[i])
                arrayOfValues.push(incomingObject[objectKeys[i]]);
        }
        return arrayOfValues;
    }

    calculateDateDifference(startDate, endDate, diffType){
        return moment(startDate, 'YYYY-MM-DD').diff(moment(endDate, 'YYYY-MM-DD'), diffType);
    }
    
    createDays(startDate, endDate){
        const days = [new Day("2018-12-12", "Pracujący"), new Day("2018-12-13", "Pracujący"), new Day("2018-12-14", "Pracujący"), new Day("2018-12-15", "Święto")];
        return days;
    }

}