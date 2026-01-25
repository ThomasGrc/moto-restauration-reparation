import { Component } from '@angular/core';
import { Contact } from "../contact/contact";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-recommandations-page',
  imports: [Contact, Navbar],
  templateUrl: './recommandations-page.html',
  styleUrl: './recommandations-page.scss',
})
export class RecommandationsPage {

}
