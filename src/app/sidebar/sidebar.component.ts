import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBarItems = [
    {name: 'Strona główna', icon: 'home', link: "/"}, 
    {name: 'Lista zadań', icon: 'alarm_on', link: "/callendars"},
    {name: 'Statystyki', icon: 'trending_up', link: "/stats"},
    {name: 'Ustawienia', icon: 'settings', link: "/settings"}
    
  ];
  showDetails = false;

  constructor() { }
  
  togleSideBar(){
    this.showDetails = !this.showDetails;
  }
  togleSideBarFromIcon(){
    if(this.showDetails){
      this.showDetails = !this.showDetails;
    }
  }

  ngOnInit() {
  }

}
