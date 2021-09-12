import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public isCollapsed: boolean;
  public selectedIndex: number = 0;

  constructor() {
    this.isCollapsed = true;
  }


  setIndex(index: number) {
     this.selectedIndex = index;
  }
}
