import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public iconMenuResponsive: boolean = false;
  public animationItensMenuResponsive: boolean = false;
  constructor() {}

  openMenu() {
    this.animationItensMenuResponsive = !this.animationItensMenuResponsive;
    this.iconMenuResponsive = !this.iconMenuResponsive;
  }
}
