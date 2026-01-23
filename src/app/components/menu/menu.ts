import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export type MenuItem = {
  route: string;
  label: string;
  ariaLabel?: string;

  imageSrc: string;
  imageAlt?: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private readonly router = inject(Router);

  public readonly items = input<MenuItem[]>([
    {
      route: '/projets',
      label: 'Mes travaux',
      imageSrc: '/assets/wrench.svg',
      imageAlt: 'Illustration Mes travaux',
    },
    {
      route: '/pieces',
      label: 'Pieces à vendre',
      imageSrc: '/assets/setting.svg',
      imageAlt: 'Illustration Pieces à vendre',
    },
    {
      route: '/recommandations',
      label: 'Recommandations',
      imageSrc: '/assets/heart.svg',
      imageAlt: 'Illustration Recommandations',
    },
  ]);

  public navigate(item: MenuItem): void {
    this.router.navigateByUrl(item.route);
  }
}
