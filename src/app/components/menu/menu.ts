import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export type MenuItem = {
  route: string;
  label: string;
  ariaLabel?: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  public readonly items = input<MenuItem[]>([
    { route: '/projets', label: 'Mes travaux' },
    { route: '/pieces', label: 'Pièces à vendre' },
    { route: '/recommandation', label: 'Recommandation' },
  ]);

  constructor(private readonly router: Router) {}

  public navigate(item: MenuItem): void {
    this.router.navigateByUrl(item.route);
  }
}
