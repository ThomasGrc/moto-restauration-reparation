import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Contact } from "../contact/contact";
import { Navbar } from "../navbar/navbar";
import { Separator } from "../separator/separator";

@Component({
  selector: 'app-recommandations-page',
  imports: [Contact, Navbar, Separator],
  templateUrl: './recommandations-page.html',
  styleUrl: './recommandations-page.scss',
})
export class RecommandationsPage implements OnInit {
  private readonly platformId = inject(PLATFORM_ID)

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // or 'smooth' if you prefer
    });
  }
  
}
