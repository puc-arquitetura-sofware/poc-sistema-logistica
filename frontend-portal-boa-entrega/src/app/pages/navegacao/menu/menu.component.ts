import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.selectedIndex = this.getIndexMenu();
  }


  setIndex(index: number) {
    this.selectedIndex = index;
  }

  getIndexMenu(): number {
    var url = window.location.pathname;

    if(url.includes('saf')) {
      this.selectedIndex = 1;
      return 1
    } else
    if(url.includes('sge')) {
      this.selectedIndex = 2;
      return 2
    } else
    if(url.includes('sfc')) {
      this.selectedIndex = 3;
      return 3
    } else
    if(url.includes('gsl')) {
      this.selectedIndex = 4;
      return 4
    } else {
      this.selectedIndex = 0;
      return 0;
    }

  }
}
