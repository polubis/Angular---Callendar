import { EventEmitter } from '@angular/core';

export class ComunicatesService{
    comunicate: Comunicate;
    constructor(){
        this.comunicate = new Comunicate(false, "", null);
    }

    comunicateStatusChanged: EventEmitter<Comunicate> = new EventEmitter<Comunicate>();

    showComunicate(message, status){
        this.comunicate.message = message;
        this.comunicate.showComunicate = true;
        this.comunicate.comunicateStatus = status;
        this.comunicateStatusChanged.emit(this.comunicate);
        setTimeout(() => {
            this.clearComunicate()
        }, 5000);
    }
    
    hideComunicate(){
        this.clearComunicate();
        this.comunicateStatusChanged.emit(this.comunicate);
    }

    private clearComunicate(){
        this.comunicate.message = "";
        this.comunicate.showComunicate = false;
        this.comunicate.comunicateStatus = null;
    }
}

export class Comunicate{
    constructor(public showComunicate: boolean, public message: string, public comunicateStatus?: boolean){

    }
}