import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('navbar', { static: true })
  private readonly navbarRef!: ElementRef<HTMLElement>;

  public readonly buttons = [
    { label: 'Mes travaux', sectionId: 'projets' },
    { label: 'Autres', sectionId: 'menu' },
    { label: 'Prestations', sectionId: 'prestations' },
    { label: 'Pièces', sectionId: 'products' },
    { label: 'A propos', sectionId: 'propos' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  /* Track viewport width instead of height */
  private readonly viewportWidth = signal<number>(
    this.isBrowser ? window.innerWidth : 0
  );

  /* Mobile breakpoint — tune as desired */
  public readonly isPhone = computed(() => this.viewportWidth() <= 768);

  public readonly menuOpen = signal(false);

  constructor() {
    effect(() => {
      if (!this.isPhone()) {
        this.menuOpen.set(false);
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    this.viewportWidth.set(window.innerWidth);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }

  public toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  public closeMenu(): void {
    this.menuOpen.set(false);
  }

  public scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbarHeight = this.navbarRef.nativeElement.offsetHeight;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({ top, behavior: 'smooth' });

    // Mobile UX: close drawer after navigation
    this.closeMenu();
  }
}
