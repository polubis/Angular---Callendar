import { Component, OnInit } from '@angular/core';
import { ComunicatesService } from './services/comunicates.service';
import { Comunicate } from './services/comunicates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ComunicatesService]
})
export class AppComponent implements OnInit{
  title = 'ng-client-project';
  comunicate: Comunicate;
  constructor(private comunicatesService: ComunicatesService){

  }

  ngOnInit(){
    this.comunicate = this.comunicatesService.comunicate;
    console.log(this.comunicate);

    this.comunicatesService.comunicateStatusChanged
    .subscribe((comunicate: Comunicate) => {
      this.comunicate = comunicate;
    });
  }

  hideComunicate(){
    this.comunicatesService.hideComunicate();
  }
}
