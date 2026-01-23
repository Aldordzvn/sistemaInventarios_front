import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistemaInventarios';
}
