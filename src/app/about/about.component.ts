import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faLaptopCode, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faAngular, faJava, faSass, faHtml5 } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  gitHubIcon = faGithub;
  linkedInIcon = faLinkedin;
  laptopCode = faLaptopCode;
  dataBaseIcon = faDatabase;
  angularIcon = faAngular;
  javaIcon = faJava;
  sassIcon = faSass;
  htmlIcon = faHtml5;


}
