import { Component } from '@angular/core';
import { Contact } from "../contact/contact";
import { Navbar } from "../navbar/navbar";
import { Separator } from "../separator/separator";

@Component({
  selector: 'app-recommandations-page',
  imports: [Contact, Navbar, Separator],
  templateUrl: './recommandations-page.html',
  styleUrl: './recommandations-page.scss',
})
export class RecommandationsPage {

}
