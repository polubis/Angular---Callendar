import { Input } from './input.model';
export class Form{
    constructor(public isFormDirty: boolean, 
        public inputResults: Input[]){
    }
}
