import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class SplashPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Redirigir a la vista de inicio (/tabs/home) después de 2.5 segundos
    setTimeout(() => {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    }, 2500);
  }
}
