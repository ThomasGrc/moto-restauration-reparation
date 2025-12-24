import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  @ViewChild('navbar', { static: true })
  private readonly navbarRef!: ElementRef<HTMLElement>;

  public readonly buttons = [
    { label: 'Accueil', sectionId: 'home' },
    { label: 'À propos', sectionId: 'about' },
    { label: 'Prestations', sectionId: 'prestations' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  public scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbarHeight = this.navbarRef.nativeElement.offsetHeight;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}
