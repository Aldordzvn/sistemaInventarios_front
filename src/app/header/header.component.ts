import { Component, inject } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faMoon, faBars, faBoxesStacked, faCircleInfo, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterModule } from "@angular/router";
import { ThemeService } from '../service/theme/theme.service';
import { NgClass } from "../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  moonIcon = faMoon;
  menuIcon = faBars;
  componentsIcon = faBoxesStacked;
  aboutIcon = faCircleInfo;
  backIcon = faArrowLeft;
  menuMobileToggle : boolean = false;
  hasInteracted: boolean = false;
  private themeService = inject(ThemeService);

  toggleTheme(): void{
    this.themeService.toggleTheme();
  }

  openModal(){
    this.menuMobileToggle = !this.menuMobileToggle;
    this.hasInteracted = true;
  }
}
