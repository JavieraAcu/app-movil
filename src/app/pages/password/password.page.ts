import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  username!: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}
  async backtoLogin(){
    this.router.navigate(['/login'])
  }
}
