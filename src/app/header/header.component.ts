import { Component } from '@angular/core';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faMoon} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  moonIcon = faMoon;
}
