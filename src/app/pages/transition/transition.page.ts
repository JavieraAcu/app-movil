import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.page.html',
  styleUrls: ['./transition.page.scss'],
})
export class TransitionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Espera 3 segundos y luego redirige al home
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);  // Cambia el tiempo según sea necesario
  }
}
