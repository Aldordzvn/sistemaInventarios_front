import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBoxesStacked, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-aside-menu',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  storeIcon = faBoxesStacked;
  infoIcon = faCircleInfo;
}
