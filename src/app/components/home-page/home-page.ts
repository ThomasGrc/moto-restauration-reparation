import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Contact } from "../contact/contact";
import { Prestations } from "../prestations/prestations";
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-home-page',
  imports: [Navbar, Contact, Prestations, Menu],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  
}
