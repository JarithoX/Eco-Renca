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
    // Redirigir según la existencia de una carrera seleccionada
    setTimeout(() => {
      const savedCareerId = localStorage.getItem('selectedEcoRencaCareer');
      if (savedCareerId) {
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/career-selection', { replaceUrl: true });
      }
    }, 2500);
  }
}
