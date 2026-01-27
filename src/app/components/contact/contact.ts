import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  redirectToFacebook(): void {
    const facebookUrl = 'https://www.facebook.com/DidierMenguy83/';
    window.open(facebookUrl, '_blank');
    console.log('Redirecting to Facebook page:', facebookUrl);
  }
}
